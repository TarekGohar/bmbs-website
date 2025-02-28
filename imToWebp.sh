find . -type f \( -iname "*.webp" -o -iname "*.webp" -o -iname "*.webp" \) | while read file; do
  webp_file="${file%.*}.webp"
  echo "Converting $file -> $webp_file"
  convert "$file" -quality 80 "$webp_file"
done

