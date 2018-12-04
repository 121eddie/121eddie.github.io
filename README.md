# ReadMinds
realised by Pranita   and Eduard Ergenzinger 安东
 
⛔Todo
🆗Done

**_Progressive Web App in html5/css/javascript/json  🆗

**_Functionalities

Progressive Web App installed on smartphone with manifest.json 🆗
Saved in Browser with Service Worker 🆗
Suggests meaningfull readings to user ⛔

**_Login and registration

**Registration 1 - all requests through server**
index.html - user is prompted to log in or register
the results are sent to server with php request
server logs into the database
server verifies identity of user

after that, ajax request to the server

=>inefficient

**Registration 2 - Direct queries to MongoDB**
server settings: allows reader account, with limited rights

user fills registration form

**variant 1_: validity of regitration info checked on client side (ajax)**
anonymous connection to database (security issue 1)
check non-existence of user information
add database reader-user (corruption/security issue 2)
stored with service worker
login as reader-user
add user info in database

**variant 2: validity of regitration info checked on server side**
registration request to server (php or ajax)
server connects to database
server checks i) non-existence of user ii) validity of registration data
server adds user info to database
server creates database user and transmits user login info
stored with service worker

=>better consistency, makes security possible

**Login**
User logs in to database

**_Read Page

