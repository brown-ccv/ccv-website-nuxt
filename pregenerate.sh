#!/bin/sh

# === clean up old state ===

# people images
rm -rf static/images/people

# === copy ===

# people images
mkdir -p static/images/people
cp -r content/images/people static/images