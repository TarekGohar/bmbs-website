#!/bin/bash

# Set max resolution for QHD
LANDSCAPE_WIDTH=2560
PORTRAIT_HEIGHT=2560

# Ensure ImageMagick is installed
if ! command -v identify &> /dev/null || ! command -v convert &> /dev/null; then
    echo "Error: ImageMagick is not installed. Install it using:"
    echo "  sudo apt install imagemagick   # Debian/Ubuntu"
    echo "  brew install imagemagick       # macOS"
    exit 1
fi

# Process all .webp images recursively
find . -type f -iname "*.webp" | while read -r file; do
    # Get current width and height
    read width height < <(identify -format "%w %h" "$file")

    # Check image orientation
    if [[ "$height" -gt "$width" ]]; then
        # Portrait: Set height to 2560px and scale width accordingly
        new_height=$PORTRAIT_HEIGHT
        new_width=$((width * PORTRAIT_HEIGHT / height))
    else
        # Landscape: Set width to 2560px and scale height accordingly
        new_width=$LANDSCAPE_WIDTH
        new_height=$((height * LANDSCAPE_WIDTH / width))
    fi

    # Resize only if the image is larger than the target size
    if [[ "$width" -gt "$new_width" || "$height" -gt "$new_height" ]]; then
        echo "Resizing: $file ($width x $height) → ($new_width x $new_height)"
        convert "$file" -resize "${new_width}x${new_height}" "$file"
    else
        echo "Skipping: $file (Already smaller or equal to target size)"
    fi
done

echo "Resizing completed."
