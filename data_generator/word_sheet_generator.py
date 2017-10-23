#!/usr/bin/env python
import os
import csv
import argparse


def process_images_dir(img_dir, csvwriter):
    row = 1
    for root, dirs, files in os.walk(img_dir):
        for image_filename in files:
            word = os.path.splitext(image_filename)[0]
            csvwriter.writerow([
                image_filename,
                word,
                f'=GOOGLETRANSLATE(B{row},"en","bg")'
            ])
            row += 1


parser = argparse.ArgumentParser(description='Generate csv from image dir')
parser.add_argument('output', help='output file')
parser.add_argument('src_images', help='source images dir')


args = parser.parse_args()


with open(args.output, 'w', newline='') as csvfile:
    csvwriter = csv.writer(csvfile, delimiter=',',
                           quotechar='"', quoting=csv.QUOTE_MINIMAL)
    process_images_dir(args.src_images, csvwriter)
