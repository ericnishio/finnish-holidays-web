#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

aws s3 rm s3://finnishholidays.com/.well-known --recursive --profile ericnishio

rm -rf $DIR/../.tmp
