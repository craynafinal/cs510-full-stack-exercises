#!/bin/bash

source ./../setup.bash

strCategory="security"
strName="injection"
strFile="injection.txt"

wget -q -O /dev/stdout --auth-no-challenge --user="${strUser}" --password="${strPassword}" --post-file="${strFile}" "${strServer}/test?strCategory=${strCategory}&strAssignment=${strName}"