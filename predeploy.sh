#!/bin/sh

# clean up old state
rm -rf dist/*
rm -rf functions/content
rm -rf functions/.nuxt/*\ncp -r .nuxt functions

# set up new state
cp -r content functions/content
cp nuxt.config.js functions
cp -r .nuxt/dist/client dist
