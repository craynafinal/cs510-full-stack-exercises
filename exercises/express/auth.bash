#!/bin/bash

source ./../setup.bash

strCategory="express"
strName="auth"
strFile="auth.js"

wget -q -O /dev/stdout --auth-no-challenge --user="${strUser}" --password="${strPassword}" --post-file="${strFile}" "${strServer}/test?strCategory=${strCategory}&strAssignment=${strName}"