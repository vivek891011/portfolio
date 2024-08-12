#!/bin/bash

read -p "Enter a number: " NUM

echo
if [ $NUM -eq 50 ]
then
        echo "we have entered in F-Block."
elif [ $NUM -gt 50 ]
then
        echo "we have entered in D-Block"
else
        echo "we have entered in A-Block"
fi

echo "script execution successfully completed."

