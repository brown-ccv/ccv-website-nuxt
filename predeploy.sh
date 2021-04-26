#!/bin/sh

# clean up old state
rm -rf dist
rm -rf functions/content
rm -rf functions/.nuxt/*\ncp -r .nuxt functions

# set up new state
mkdir dist
cp -r content functions
cp nuxt.config.js functions
cp -r .nuxt/dist/client dist
