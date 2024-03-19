#!/bin/bash

#### INITIATE
# Load environment variables from .env file
# Adjust the path if your .env file is located elsewhere
source .env

# Destination directory for backups
backup_dir="tempBackups"
# Create the backup directory if it doesn't exist
mkdir -p "$backup_dir"

#### DEFINE FUNCTIONS
uploadDatabaseBackup() {
  # Timestamp for the backup file
  timestamp=$(date +%Y-%m-%d)

  output_file="$DB_NAME-$timestamp.sql"
  temp_output_file="$backup_dir/$output_file"

  # Backup the MySQL database
  mysqldump -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" >"$backup_dir/$output_file"

  # Upload temp file to dropbox
  ./Dropbox-Uploader/dropbox_uploader.sh upload "$temp_output_file" database/"$output_file"
}

uploadFormattedNarvaro() {
  current_year=$(date +'%Y')
  narvaro_table="narvaro_$current_year"

  output_file="formattedNarvaro_$current_year.csv"
  temp_output_file="$backup_dir/$output_file"

  # Run SQL query to fetch data grouped by personnummer, first_name and last_name.
  # Add column for each date existing in table.
  # If group has row with date of column set true, otherwise set false.
  # Output into comma separated file and replace "_" with "-" for the date columns.
  echo "SET @sql = NULL;
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

    SET @sql = CONCAT('SELECT personnummer, first_name AS förnamn, last_name AS efternamn, ', @sql, ' FROM "$narvaro_table" GROUP BY personnummer, first_name, last_name');

    PREPARE stmt FROM @sql;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;" |
    mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" "$DB_NAME" | tr '\t' ',' | tr '_' '-' >"$temp_output_file"

  # Upload temp file to dropbox
  ./Dropbox-Uploader/dropbox_uploader.sh upload "$temp_output_file" narvaro/"$output_file"
}

uploadFormattedMemberlistBackup() {
  # Timestamp for the backup file
  timestamp=$(date +%Y-%m-%d)
  output_file="formattedMedlemslistaBackup_$timestamp.csv"
  temp_output_file="$backup_dir/$output_file"

  # MySQL query to select all rows from the member table
  SQL_QUERY="SELECT personnummer, first_name AS förnamn, last_name AS efternamn, end_date AS 'medlem t.o.m' FROM member;"

  # Execute MySQL query and save the result into a CSV file
  mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" -D "$DB_NAME" -e "$SQL_QUERY" | tr '\t' ',' >"$temp_output_file"

  # Upload temp file to dropbox
  ./Dropbox-Uploader/dropbox_uploader.sh upload "$temp_output_file" medlemslista/"$output_file"
}

updateMemberlistFromDropbox() {
  dropbox_input_file="medlemslista.csv"
  temp_input_file="$backup_dir/temp_memberlist.csv"

  # Download file from Dropbox
  ./Dropbox-Uploader/dropbox_uploader.sh download medlemslista/"$dropbox_input_file" "$temp_input_file"

  # MySQL query to update the member table
  SQL_UPDATE="CREATE TEMPORARY TABLE temp_member LIKE member;
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
  mysql --local_infile=1 -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" -D "$DB_NAME" -e "$SQL_UPDATE"
}

#### RUN FUNCTIONS
# uploadDatabaseBackup
# uploadFormattedNarvaro
# uploadFormattedMemberlistBackup
updateMemberlistFromDropbox

#### CLEAN UP
# Remove tempBackups and its content
rm -r $backup_dir
