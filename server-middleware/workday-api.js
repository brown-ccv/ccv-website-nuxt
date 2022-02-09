const app = require('express')();
const axios = require('axios').default;

const endpoint =
  'https://brown.wd5.myworkdayjobs.com/wday/cxs/brown/staff-careers-brown/jobs';
const location = '180 George Street';
const body = {
  limit: 20,
  offset: 0,
  appliedFacets: {},
  searchText: location,
};
const headers = { 'Content-Type': 'application/json' };

app.all('/opportunities', async (req, res, next) => {
  try {
    const response = await axios.post(endpoint, body, { headers });
    const opportunities = response.data.jobPostings.filter(
      (j) => j.locationsText === location
    );

    res.json(opportunities);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    next(err);
  }
});

module.exports = app;
