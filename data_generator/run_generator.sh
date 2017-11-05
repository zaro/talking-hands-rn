#!/bin/sh

THIS_SCRIPT_DIR=$(cd `dirname $0`; pwd)
cd $THIS_SCRIPT_DIR

./data_generator.py --rm ../data/ ../images/ ../wordimg/ ../wordimg/EN_Colored_Pictograms/
