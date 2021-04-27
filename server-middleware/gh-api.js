require('dotenv').config();
const app = require('express')();
const GraphQLClient = require('graphql-request').GraphQLClient;

const endpoint = 'https://api.github.com/graphql';
let client;
if (process.env.NODE_ENV !== 'production' && !process.env.GITHUB_TOKEN) {
  console.log('Skipping connecting to gh api');
} else {
  client = new GraphQLClient(endpoint, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'User-Agent': process.env.GITHUB_USER
    }
  });
}

/**
 * Get GraphQL query string to fetch list of issues for all repos in a organization.
 *
 * @function statusQuery
 * @param {string} organization - Name of GitHub organization
 * @param {string} issueState - State of issues (eg. OPEN, CLOSED)
 * @return {string} The GraphQL query string.
 */
const statusQuery = (organization, issueState) => `{
    organization(login: "${organization}") {
      repositories(first: 10) {
        nodes {
          id
          name
          issues(first: 10, states: [${issueState}]) {
            edges {
              node {
                id
                labels(first: 10) {
                  nodes {
                    color
                    name
                  }
                }
                author {
                  login
                }
                createdAt
                closedAt
                editor {
                  login
                }
                title
                updatedAt
              }
            }
          }
        }
      }
    }
  }
  `;

app.all('/status', async (req, res, next) => {
  console.log('IN STATUS API');

  // short circuit if no credentials
  if (!client) res.json([]);

  try {
    const response = await client.request(statusQuery('ccv-status', 'OPEN'));
    const status = [];

    // individual status
    response.organization.repositories.nodes.forEach((repo) => {
      status.push({ name: repo.name, open_issues: repo.issues.edges.length });
    });

    // aggregate status
    const totalOpen = status
      .map((a) => a.open_issues)
      .reduce((a, b) => a + b, 0);
    const disrrupted = status
      .filter((a) => a.open_issues > 0)
      .map((a) => a.name);
    status.push({ name: 'all', open_issues: totalOpen, disrrupted });

    res.json(status);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = app;
