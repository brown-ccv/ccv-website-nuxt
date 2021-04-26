#!/bin/sh

<<<<<<< HEAD
# === clean up old state ===

# client
rm -rf dist

# server
rm -rf functions/content
rm -rf functions/.nuxt/*

# === set up new state ===

# client
mkdir dist
cp -r .nuxt/dist/client dist

# server
cp -r content functions/content
cp nuxt.config.js functions
cp -r .nuxt functions
