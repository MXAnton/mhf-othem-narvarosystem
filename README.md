# MHF Othem Närvarosystem

## Features
### Non admin
- Report närvaro with personnummer.
- See how many people are reported today.
  
### Admin
- See complete närvarolista for each day.
- See all members.
- Add members.
- Edit/remove members.
- Add new admin users.

## Frontend
- Vue 3 (frontend framework)
- Vue router (handles the routes)
- Axios (handles API requests to backend)
- Pinia (store that can be accessed globally)

## Backend
- Node.js (server)
- Express.js (handles incoming requests from frontend)
- Cors (used to allow only the frontend origin to access)
- bcryptjs (cryptates the passwords)
- jsonwebtoken (stores admin login token to stay logged in)
- MySQL (database)
- Dropbox-Uploader (submodule, handles connection with Dropbox App)

## Backups
Backups och medlemslista lagras på en Dropbox App: `https://www.dropbox.com/developers/apps/info/qynylmh8glqxe05`.
För att använda Dropbox App används submodulen Dropbox-Uploader.
02.00 varje måndag körs ett cron job på närvarosystemet. Då skapas här en backup på databasen, en csv-formatterad fil med all närvaro för nuvarande år och en csv-formatterad fil som backup på medlemslistan. Efter det hämtar närvarosystemet den nya medlemslistan härifrån och laddar upp den i databasen.
Varje gång medlemslistan ändras genom närvarosystemet skapas en ny backup och den aktiva medlemslistan här i Dropbox uppdateras.
### Automatic Backups
Open cron editor:
`crontab -e`

Run this to setup cronjob each monday 02.00:
`0 2 * * 1 autoBackup.sh`
