#!/bin/bash
uglifyjs --compress --mangle -- remap_bids.js > remap_bids.min.js
uglifyjs --compress --mangle -- stats_bids.js > stats_bids.min.js