# Dating application - eL Date
## About the app
<br />
A Social dating application made to connect people and give them a platform to connect.

## Tech used 

- Frontend
  - React
  - Redux
  - Ant Design
- Backend
  - Node JS
  - Pusher WebSocket Service
  - Postgres SQL DB
  - Nodemailer / SendGrid
  - AWS Storage



## Preview
<br />
Live demo: https://dateappeldate.herokuapp.com/
<br />
Frontend and backend are together deployed to : Heroku
<br />

## Features of the application
- Lists of user profiles;
- User Registration / Login / Forgot password  / Settings;
- Facebook Login ( requires paid domain and SSQL );
- Real Time Chat with Pusher;
- Matching with other users;
- Picture managment / Album;
- Notifications;


## Installation
- Setup .env variables  ;

```FB_CLIENTID= "Facebook Login KEY (from FB Devs page)"
FACEBOOK_CLIENTSECRET = "Facebook Login KEY (from FB Devs page)"
 COOKIE_SECRET = "Secret Key for token"
CORS_ORIGIN = "Your domain origin for CORS"


POSTGRES_CONNECTION_URL= "PGSQL Database Connection string (In this case i am using postgres of Heroku which is Free and the string can be found there from settings)"
    PUSHER_APP_ID="Needed for Pusher Socket , can be found in their webpage"
    PUSHER_APP_KEY="Needed for Pusher Socket , can be found in their webpage"
    PUSHER_APP_SECRET="Needed for Pusher Socket , can be found in their webpage"
    PUSHER_APP_CLUSTER="Needed for Pusher Socket , can be found in their webpage, This is for the Region (eu) in my case"

    REACT_APP_PUSHER_APP_KEY="This Key  is for the Frontend of the application  - in my case Front End and Backend are in same folder and deployed same place(front end is added as static to Node)"
    REACT_APP_PUSHER_CLUSTER="Pusher Front end region (eu) in my case"

    MY_EMAIL_SENDER = "SendGrid Key for Emailing services,can be found in their website"
    SECRET_TOKEN = "Secret value of Token"
    MY_FRONTEND = Password Reset Link for example: http://localhost:3000/resetpassword
    AWS_KEYID = "AWS S3 Storage Keys"
AWS_SECRET =  "AWS S3 Storage Keys"



// The next lines is not required its more for local ;
DATABASEPG_USER =  "DB Postgres keys"
DATABASEPG_PASSWORD =  "DB Postgres keys"
DATABASEPG_PORT =  "DB Postgres keys"
DATABASEPG_DATABASE =  "DB Postgres keys"
DATABASEPG_HOST =  "DB Postgres keys with Amazon S3 "


FACEBOOK_REDIRECT =FB Redirect link ,  example: http://localhost:3000/login
FACEBOOK_FAIL = If fb login fails to redirect where? ,  example: http://localhost:3000/
```
- node app.js  - to start Server and FrontEnd
- npm start from cd/Frontend folder if you want start only frontend








