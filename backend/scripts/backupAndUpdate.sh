#!/bin/bash

#### IMPORT
source ./backupFunctions.sh

#### CLEAR AND SET UP LOGS
logFile=output.log
removeOldLogs $logFile
# Redirect stdout (1) and stderr (2) to a log file with timestamp
exec > >(awk '{ print strftime("%Y-%m-%d %H:%M:%S |"), $0; fflush(); }' | tee -a $logFile) 2>&1

#### INITIALIZE
# Get the directory of the current script
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
# Change directory to the script's directory
cd "$SCRIPT_DIR" || exit

echo "________________________BEGINNING-OF-BACKUP-&-UPDATE________________________"

#### RUN FUNCTIONS
uploadDatabaseBackup
uploadFormattedNarvaro
uploadFormattedMemberlistBackup
updateMemberlistFromDropbox

echo "---------------------------END-OF-BACKUP-&-UPDATE---------------------------"
echo ""

uploadLogsToDropbox
