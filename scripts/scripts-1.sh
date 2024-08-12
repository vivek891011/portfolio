#!/bin/bash

read -p "Enter a number: " NUM
echo 
if [ $NUM -gt 100 ]
then
	echo "we have entered in F-block. "
	echo 

	sleep 3
	echo "your number is greater than 100"
	echo 
	date 
fi
echo "we have Successfully executed scripts"


