#!/bin/bash

source ./../setup.bash

strCategory="express"
strName="sessions"
strFile="sessions.js"

wget -q -O /dev/stdout --auth-no-challenge --user="${strUser}" --password="${strPassword}" --post-file="${strFile}" "${strServer}/test?strCategory=${strCategory}&strAssignment=${strName}"