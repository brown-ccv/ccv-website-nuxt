#!/bin/sh

# === clean up old state ===

# server-side
rm -rf functions/.nuxt/*
rm -rf functions/server-middleware
rm -rf functions/hooks

# === set up new state ===

# server-side
mkdir -p functions/content # supress warning from nuxt about folder not existing
cp -r server-middleware functions/server-middleware
cp -r hooks functions/hooks
cp nuxt.config.js functions
cp -r .nuxt functions
