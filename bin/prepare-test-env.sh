#!/bin/bash

directory="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
feature_path=$directory"/../hbw-features"

if [ -d $feature_path ]; then
    echo "Directory already exists - removing directory"
    rm -rf $feature_path
fi

mkdir -p $feature_path
chmod 777 $feature_path