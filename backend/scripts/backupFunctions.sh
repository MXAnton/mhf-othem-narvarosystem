#!/bin/bash

#### INITIATE
# Get the directory of the current script
SCRIPT_DIR=$(dirname "$(readlink -f "$0")")
# Change directory to the script's directory
cd "$SCRIPT_DIR" || exit

# Load environment variables from .env file
# Adjust the path if your .env file is located elsewhere
source "../.env"

DROPBOX_UPLOADER="../Dropbox-Uploader/dropbox_uploader.sh"

# Temp destination directory for backups
backup_dir="tempBackups"

# Create the temp backup directory if it doesn't exist
mkdir -p "$backup_dir"

#### DEFINE FUNCTIONS
uploadDatabaseBackup() {
  # Timestamp for the backup file
  local timestamp=$(date +%Y-%m-%d)

  local output_file="$DB_NAME-$timestamp.sql"
  local temp_output_file="$backup_dir/$output_file"

  echo "----------------------------------------------------------------------------"
  echo "Start upload database backup: $output_file"

  # Backup the MySQL database
  mysqldump -h "$DB_HOST" -u "$DB_BACKUPS_USER" -p"$DB_BACKUPS_PASSWORD" "$DB_NAME" >"$temp_output_file"

  # Upload temp file to dropbox
  $DROPBOX_UPLOADER upload "$temp_output_file" database/"$output_file"
  # Check if any errors occurred during the upload
  if [ $? -ne 0 ]; then
    response="ERROR! Failed to upload database backup."
  else
    response="Finished uploading database backup."
  fi

  # Remove temp file
  rm $temp_output_file

  echo $response
}

uploadFormattedNarvaro() {
  echo "----------------------------------------------------------------------------"
  echo "Start upload formatted narvaro of current year."

  local current_year=$(date +'%Y')
  local narvaro_table="narvaro_$current_year"

  local output_file="formattedNarvaro_$current_year.csv"
  local temp_output_file="$backup_dir/$output_file"

  # Run SQL query to fetch data grouped by personnummer, first_name and last_name.
  # Add column for each date existing in table.
  # If group has row with date of column set true, otherwise set false.
  # Output into comma separated file and replace "_" with "-" for the date columns.
  echo "
  -- Increase group_concat_max_len to avoid truncation of long GROUP_CONCAT() results
  SET SESSION group_concat_max_len = 1000000;
  
  SET @sql = NULL;
    SELECT
      GROUP_CONCAT(DISTINCT
        CONCAT(
          'MAX(CASE WHEN date = ''',
          date,
          ''' THEN TRUE ELSE FALSE END) AS ',
          CONCAT(REPLACE(date, '-', '_'))
        )
      ) INTO @sql
    FROM "$narvaro_table";

    -- Now, generate the full SQL by appending the SELECT and FROM clauses
    SET @sql = CONCAT('SELECT personnummer, first_name AS förnamn, last_name AS efternamn, ', @sql, ' FROM "$narvaro_table" GROUP BY personnummer, first_name, last_name');

    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;" |
    mysql -h "$DB_HOST" -u "$DB_BACKUPS_USER" -p"$DB_BACKUPS_PASSWORD" "$DB_NAME" | tr '\t' ',' | tr '_' '-' >"$temp_output_file"

  # Upload temp file to dropbox
  $DROPBOX_UPLOADER upload "$temp_output_file" narvaro/"$output_file"
  # Check if any errors occurred during the upload
  if [ $? -ne 0 ]; then
    response="ERROR! Failed to upload formatted narvaro of current year."
  else
    response="Finished uploading formatted narvaro of current year."
  fi

  # Remove temp file
  rm $temp_output_file

  echo $response
}
uploadFormattedNarvaroToDb() {
  echo "----------------------------------------------------------------------------"
  echo "Start update database narvaro."

  local year=$1
  local input_file="$backup_dir/GOOD_oldFormattedNarvaro_$year.csv"
  local temporary_table="temp_narvaro_$year"

  # MySQL query to update the member table
  local SQL_UPDATE="CREATE TABLE IF NOT EXISTS narvaro_$year LIKE narvaro_2024;
    CREATE TEMPORARY TABLE $temporary_table LIKE narvaro_2024;
    LOAD DATA LOCAL INFILE '$input_file'
    IGNORE
    INTO TABLE $temporary_table
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (date, personnummer, first_name, last_name, type, has_license);
    -- Insert or update rows in narvaro table based on temp_narvaro_year
    INSERT INTO narvaro_$year (date, personnummer, first_name, last_name, type, has_license)
    SELECT date, personnummer, first_name, last_name, type, has_license FROM $temporary_table;"

  # Execute MySQL query to update member table
  mysql --local_infile=1 -h "$DB_HOST" -u "$DB_BACKUPS_USER" -p"$DB_BACKUPS_PASSWORD" -D "$DB_NAME" -e "$SQL_UPDATE"

  echo "Finished updating database narvaro."
}

uploadFormattedMemberlist() {
  local output_file=$1
  local output_folder=$2
  local temp_output_file="$backup_dir/$output_file"

  echo "----------------------------------------------------------------------------"
  echo "Start upload formatted memberlist: $output_file"

  # MySQL query to select all rows from the member table
  local SQL_QUERY="SELECT personnummer, first_name AS förnamn, last_name AS efternamn, end_date AS 'medlem t.o.m' FROM member;"

  # Execute MySQL query and save the result into a CSV file
  mysql -h "$DB_HOST" -u "$DB_BACKUPS_USER" -p"$DB_BACKUPS_PASSWORD" -D "$DB_NAME" -e "$SQL_QUERY" | tr '\t' ',' >"$temp_output_file"

  # Upload temp file to dropbox
  $DROPBOX_UPLOADER upload "$temp_output_file" medlemslista/"$output_folder""$output_file"
  # Check if any errors occurred during the upload
  if [ $? -ne 0 ]; then
    response="ERROR! Failed to upload formatted memberlist."
  else
    response="Finished uploading formatted memberlist."
  fi

  # Remove temp file
  rm $temp_output_file

  echo $response
}
uploadFormattedMemberlistBackup() {
  # Timestamp for the backup file
  local timestamp=$(date +%Y-%m-%d)
  local output_file="medlemslistaBackup_$timestamp.csv"

  uploadFormattedMemberlist "$output_file" backups/
}

updateMemberlistFromDropbox() {
  echo "----------------------------------------------------------------------------"
  echo "Start download memberlist and update database memberlist."

  local dropbox_input_file="medlemslista.csv"
  local temp_input_file="$backup_dir/temp_memberlist.csv"

  # Download file from Dropbox
  $DROPBOX_UPLOADER download medlemslista/"$dropbox_input_file" "$temp_input_file"
  # Check if any errors occurred during the download
  if [ $? -ne 0 ]; then
    echo "ERROR! Failed to fetch memberlist from Dropbox App."
    return 1
  fi

  # MySQL query to update the member table
  local SQL_UPDATE="CREATE TEMPORARY TABLE temp_member LIKE member;
    LOAD DATA LOCAL INFILE '$temp_input_file'
    IGNORE
    INTO TABLE temp_member
    FIELDS TERMINATED BY ','
    LINES TERMINATED BY '\n'
    IGNORE 1 LINES
    (personnummer, first_name, last_name, @end_date)
    SET end_date = STR_TO_DATE(@end_date, '%Y-%m-%d');
    -- Delete rows from member table that don't have a matching personnummer in temp_member
    DELETE FROM member 
    WHERE personnummer NOT IN (SELECT personnummer FROM temp_member);
    -- Insert or update rows in member table based on temp_member
    INSERT INTO member (personnummer, first_name, last_name, end_date)
    SELECT personnummer, first_name, last_name, end_date FROM temp_member
    ON DUPLICATE KEY UPDATE
    first_name = VALUES(first_name), 
    last_name = VALUES(last_name), 
    end_date = VALUES(end_date);"

  # Execute MySQL query to update member table
  mysql --local_infile=1 -h "$DB_HOST" -u "$DB_BACKUPS_USER" -p"$DB_BACKUPS_PASSWORD" -D "$DB_NAME" -e "$SQL_UPDATE"
  # Check if any errors occurred during the upload
  if [ $? -ne 0 ]; then
    response="ERROR! Failed to update memberlist in database from Dropbox file."
  else
    response="Finished downloading memberlist and updating database memberlist."
  fi

  # Remove temp file
  rm $temp_input_file

  echo $response
}

uploadLogsToDropbox() {
  local output_file="lastMonth.log"
  local output_folder=logs/
  local file_to_upload="$output_file"

  # Upload temp file to dropbox
  $DROPBOX_UPLOADER upload "$file_to_upload" "$output_folder""$output_file"
  # Check if any errors occurred during the upload
  if [ $? -ne 0 ]; then
    echo "ERROR! Failed to upload logs to Dropbox."
  fi
}

removeOldLogs() {
  local log_file="$1"     # Log file path passed as argument
  local threshold_days=30 # Threshold in days (1 month)

  # Get the current time in seconds since epoch
  local current_time=$(date +%s)

  # Create a temporary file to store valid log lines
  local temp_file=$(mktemp)

  while IFS= read -r line; do
    # Extract the timestamp from the log line (first 19 characters)
    local log_date=$(echo "$line" | cut -d '|' -f1 | xargs)

    # Convert the log timestamp to seconds since epoch
    local log_time=$(date -d "$log_date" +%s 2>/dev/null)

    # If date parsing succeeds, check the difference
    if [[ -n "$log_time" ]]; then
      local time_diff=$(((current_time - log_time) / (60 * 60 * 24)))

      # If the log is within the threshold (less than or equal to 30 days), keep it
      if [[ "$time_diff" -le "$threshold_days" ]]; then
        echo "$line" >>"$temp_file"
      fi
    else
      # If the log line doesn't have a valid timestamp, keep it (optional)
      echo "$line" >>"$temp_file"
    fi
  done <"$log_file"

  # Replace the original log file with the filtered content
  mv "$temp_file" "$log_file"
}
