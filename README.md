# ReadMinds
realised by Pranita   and Eduard Ergenzinger 安东
 
⛔Todo
🆗Done

**_Progressive Web App in html5/css/javascript/json  🆗_**

**_Functionalities_**

Progressive Web App installed on smartphone with manifest.json 🆗
Saved in Browser with Service Worker 🆗
Suggests meaningfull readings to user ⛔

**_Login and registration_**

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
NTH: remember me checkbox, saved in browser

=>better consistency, makes security possible

**Login**
User typs login and password and logs in to database
NTH: remember me checkbox

after successfull login or registration, the user lands on the my reads page

**_My information_**
//problem: redundancy with index
page that allows to view the user's information
_variant 1_
for each characteristic: modify field, validate button
_variant 2_
modify field at the right of each field
one validate button

Land page after successfull login/registration:
shall we create a **_Suggestions_** or work with the outliner on article page?
configurable? limited number of articles per page
switch page and search functions
link to each article
suggested articles computed each time
description and image loaded once and saved with SW

**_[name_of_article]_**
Outliner with ~10 suggested articles
Load article and images
//what is the structure of an article?

**Contact**
authors, mailto link, site plan

**_Terms of use_**
pure text page
necessary as user info is stored

**_Administration_**
Nice-to-have web interface for database administration
can  also be done in mongodb

