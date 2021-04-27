#!/bin/sh

# === clean up old state ===

# client
# rm -rf dist

# server
rm -rf functions/content
rm -rf functions/.nuxt/*
rm -rf functions/server-middleware

# === set up new state ===

# client
# mkdir dist
# cp -r .nuxt/dist/client dist
# cp -r static/* dist

# server
cp -r content functions/content
cp -r server-middleware functions/server-middleware
cp nuxt.config.js functions
cp -r .nuxt functions
