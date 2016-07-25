#!/bin/bash

source ./../setup.bash

strCategory="javascript"
strName="tools"
strFile="tools.txt"

wget -q -O /dev/stdout --auth-no-challenge --user="${strUser}" --password="${strPassword}" --post-file="${strFile}" "${strServer}/test?strCategory=${strCategory}&strAssignment=${strName}"