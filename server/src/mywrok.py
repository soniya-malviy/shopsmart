#!/usr/bin/env python3
"""
Automate Start/Stop operations using a simple CLI.
This version is written in Python so it parses correctly when linted as .py.
"""

import subprocess
import sys


# Hardcoded Instance ID
INSTANCE_ID = "i-xxxxxxxx"


def main() -> None:
    """Parse the CLI argument and start/stop the instance."""
    if len(sys.argv) < 2:
        print("[ERROR] Missing argument")
        print(f"Usage: {sys.argv[0]} start|stop")
        sys.exit(1)

    action = sys.argv[1]

    if action == "start":
        print(f"[INFO] Requesting Start for {INSTANCE_ID}...")
        subprocess.run(
            ["aws", "ec2", "start-instances", "--instance-ids", INSTANCE_ID],
            check=True,
        )
    elif action == "stop":
        print(f"[INFO] Requesting Stop for {INSTANCE_ID}...")
        subprocess.run(
            ["aws", "ec2", "stop-instances", "--instance-ids", INSTANCE_ID],
            check=True,
        )
    else:
        print("[ERROR] Invalid argument")
        print(f"Usage: {sys.argv[0]} start|stop")
        sys.exit(1)


if __name__ == "__main__":
    main()
