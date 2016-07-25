#!/bin/bash

source ./../setup.bash

strCategory="moment"
strName="print"
strFile="print.html"

wget -q -O /dev/stdout --auth-no-challenge --user="${strUser}" --password="${strPassword}" --post-file="${strFile}" "${strServer}/test?strCategory=${strCategory}&strAssignment=${strName}"