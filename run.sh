#!/bin/bash

num=0

if [ $num -gt 0 ]
then
    echo "Positive number"
elif [ $num -lt 0 ]
then
    echo "Negative number"
else
    echo "Zero"
fi
