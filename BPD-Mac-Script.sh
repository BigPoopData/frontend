#!/bin/sh

FIRST_ARGUMENT="/Volumes/MACHEINBACKUPVONMIR/BPD-Frontend/"

cd FIRST_ARGUMENT

git pull

open -a "Google Chrome" FIRST_ARGUMENT/index.html
