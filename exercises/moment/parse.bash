#!/bin/bash

source ./../setup.bash

strCategory="moment"
strName="parse"
strFile="parse.html"

wget -q -O /dev/stdout --auth-no-challenge --user="${strUser}" --password="${strPassword}" --post-file="${strFile}" "${strServer}/test?strCategory=${strCategory}&strAssignment=${strName}"