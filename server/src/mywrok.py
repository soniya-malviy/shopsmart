#!/bin/bash
# Automate Start/Stop operations. Focus: Bash Basics & Arguments.

# Hardcoded Instance ID
INSTANCE_ID="i-xxxxxxxx"

# Read argument
ACTION=$1

if [ "$ACTION" == "start" ]; then
    echo "[INFO] Requesting Start for $INSTANCE_ID..."
    aws ec2 start-instances --instance-ids $INSTANCE_ID

elif [ "$ACTION" == "stop" ]; then
    echo "[INFO] Requesting Stop for $INSTANCE_ID..."
    aws ec2 stop-instances --instance-ids $INSTANCE_ID

else
    echo "[ERROR] Invalid argument"
    echo "Usage: $0 start|stop"
    exit 1
fi
