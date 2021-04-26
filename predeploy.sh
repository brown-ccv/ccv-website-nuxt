#!/bin/sh

<<<<<<< HEAD
# === clean up old state ===

# client
rm -rf dist

# server
=======
# clean up old state
rm -rf dist
>>>>>>> 6332056b0d0f049c5369f4e1bf926c665027cc72
rm -rf functions/content
rm -rf functions/.nuxt/*

# === set up new state ===

<<<<<<< HEAD
# client
mkdir dist
cp -r .nuxt/dist/client dist

# server
cp -r content functions/content
=======
# set up new state
mkdir dist
cp -r content functions
>>>>>>> 6332056b0d0f049c5369f4e1bf926c665027cc72
cp nuxt.config.js functions
cp -r .nuxt functions
