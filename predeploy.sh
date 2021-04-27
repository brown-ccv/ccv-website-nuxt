#!/bin/sh

# === clean up old state ===

# server-side
rm -rf functions/content
rm -rf functions/.nuxt/*
rm -rf functions/server-middleware

# === set up new state ===

# server-side
cp -r content functions/content
cp -r server-middleware functions/server-middleware
cp nuxt.config.js functions
cp -r .nuxt functions
