#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

certbot certonly \
--manual \
--manual-auth-hook $DIR/certbot-auth.sh \
--manual-cleanup-hook $DIR/certbot-cleanup.sh \
-d finnishholidays.com -d www.finnishholidays.com
