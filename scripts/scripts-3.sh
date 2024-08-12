#!/bin/bash

value=$(ip a | grep -v LOOPBACK | grep -ic mtu)

if [ $value -eq 1 ]
then 
	echo "1 active interface is found."
elif [ $value -gt 1 ]
then 
	echo "multiple interface are found."
else
	echo "no active interface found."
fi


