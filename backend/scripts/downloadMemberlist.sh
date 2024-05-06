#!/bin/bash

#### INITIALIZE
# Get the directory of the current script
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
# Change directory to the script's directory
cd "$SCRIPT_DIR" || exit

#### IMPORT
source ./backupFunctions.sh

#### RUN FUNCTIONS
uploadDatabaseBackup
uploadFormattedMemberlistBackup
updateMemberlistFromDropbox
