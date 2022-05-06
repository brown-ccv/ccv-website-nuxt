#!/bin/sh

# === clean up old state ===

# images that come from content repository
rm -rf static/content/images

# === copy ===

# images that come from content repository
mkdir -p static/content/images
cp -r content/images static/content/
