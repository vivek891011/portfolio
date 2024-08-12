#!/bin/bash

read -p "Enter a number: " NUM
echo 

if [ $NUM -gt 100 ]
then
	echo "you have successfully entered in F-Block."
	echo
	sleep 2

	echo "your number is greater then 100"
	echo 
	date
else
	echo "you have entered number less then 100."
fi

echo "script execution successfully completed."


