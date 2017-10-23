#!/bin/sh

A_RES="../android/app/src/main/res/"

for d in  "$A_RES/mipmap-" "$A_RES/mipmap-" "$A_RES/mipmap-"; do
  rsvg-convert --background-color=none -o "$A_RES/mipmap-hdpi/ic_launcher.png" -w 72 -h 72  ../images/mouth-in-hands-inkscape.svg
  rsvg-convert --background-color=none -o "$A_RES/mipmap-mdpi/ic_launcher.png" -w 48 -h 48  ../images/mouth-in-hands-inkscape.svg
  rsvg-convert --background-color=none -o "$A_RES/mipmap-xhdpi/ic_launcher.png" -w 96 -h 96  ../images/mouth-in-hands-inkscape.svg
  rsvg-convert --background-color=none -o "$A_RES/mipmap-xxhdpi/ic_launcher.png" -w 144 -h 144  ../images/mouth-in-hands-inkscape.svg
done
