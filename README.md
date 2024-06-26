# MHF Othem Närvarosystem

[![Watch showcase video]([https://img.youtube.com/vi/IAtH0lDpLbo?si=wgZNTRMjeigXLZW8/maxresdefault.jpg](https://i9.ytimg.com/vi/IAtH0lDpLbo/mqdefault.jpg?sqp=CMzGp7MG-oaymwEmCMACELQB8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGH8gFig4MA8=&rs=AOn4CLCZFEjv_vkqYJ9f4VGS-Acsp8kV1g))](https://youtu.be/IAtH0lDpLbo?si=wgZNTRMjeigXLZW8)

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
- Retrieve närvarolista and edit memberlist from anywhere using Dropbox.

## Frontend
- Vue 3 (frontend framework)
- Vue router (handles the routes)
- Axios (handles API requests to backend)
- Pinia (store that can be accessed globally)

### Enviroment vars
 - VITE_BACKEND_DOMAIN="" (example: "http://localhost:3000/")
 - NODE_ENV="development"/"production"

## Backend
- Node.js (server)
- Express.js (handles incoming requests from frontend)
- Cors (used to allow only the frontend origin to access)
- bcryptjs (cryptates the passwords)
- jsonwebtoken (stores admin login token to stay logged in)
- MySQL (database)
- Dropbox-Uploader (submodule, handles connection with Dropbox App)

### Enviroment vars
 - DB_HOST=""
 - DB_USER=""
 - DB_PASSWORD=""
 - DB_NAME="mhf_narvaro"
 - DB_BACKUPS_USER=""
 - DB_BACKUPS_PASSWORD=""
 - JWT_SECRET_KEY=""
 - WHITELISTED_ORIGIN= (example: "http://localhost:5173")
 - NODE_ENV="development"/"production"
 - PORT=4000

## Backups
Backups och medlemslista lagras på en Dropbox App: `https://www.dropbox.com/developers/apps/`.
För att använda Dropbox App används submodulen Dropbox-Uploader.
02.00 varje måndag körs ett cron job på närvarosystemet. Då skapas här en backup på databasen, en csv-formatterad fil med all närvaro för nuvarande år och en csv-formatterad fil som backup på medlemslistan. Efter det hämtar närvarosystemet den nya medlemslistan härifrån och laddar upp den i databasen.
Varje gång medlemslistan ändras genom närvarosystemet skapas en ny backup och den aktiva medlemslistan här i Dropbox uppdateras.
### Automatic Backups
Open cron editor:
`crontab -e`

Run this to setup cronjob each monday 02.00:
`0 2 * * 1 autoBackup.sh`
