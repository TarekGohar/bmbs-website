#!/bin/bash

# Check if the user provided a directory as an argument
if [ "$1" ]; then
    TARGET_DIR="$1"
else
    TARGET_DIR="."
fi

# Find and remove all .bak files recursively
find "$TARGET_DIR" -type f -name "*.bak" -exec rm -f {} +

echo "All .bak files have been removed from $TARGET_DIR and its subdirectories."

