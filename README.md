<div align="center">
<pre>
  ███████╗   █████╗  ██████╗  ███████╗ ██████╗    ██████╗ 
  ██╔════╝  ██╔══██╗ ██╔══██╗ ██╔════╝ ██╔══██╗  ██╔════╝ 
 ██║  ███╗ ███████║ ██║  ██║ ███████╗ ██████╔╝ ╚█████╗  
 ██║   ██║ ██╔══██║ ██║  ██║ ██╔════╝ ██╔══██╗  ╚═══██╗ 
╚██████╔╝ ██║  ██║ ██████╔╝ ███████╗ ██║  ██║ ██████╔╝
 ╚═════╝  ╚═╝  ╚═╝ ╚═════╝  ╚══════╝ ╚═╝  ╚═╝ ╚═════╝
---------------------------------------------------
Grading API For Teachers
</pre>

</div>

## Description 

This project is 1/2 of a student tracker Web Application,
responsible for tracking and maintaining Student grades for teachers.
This project is responsible for Frontend services using Javascript's React framework.

## Installation

### Pre-requisites

- React 18.2.0 or greater
- VS Code or other code editor able to run Javascript and React

### Thinking of contributing 
1. Fork the repository(<https://github.com/AndrewL14/Student-tracker-UI/fork>)
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. 3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request and wait for someone to submit a code review.

### Disclaimer
This application is a 2 part project, if you wish to test out functionality for dev purposes 
then you will need to fork [Student-tracker-API](https://github.com/AndrewL14/Student-tracker-API) and
clone the repo, making sure to run both applications.

Currently, the UI has not been styled but the corresponding login, register, and dashboard pages
have all been implemented. An effect of this is the buttons are together and are in black letters.

### Documentation
When running the API in dev mode: A pre-made user will automatically be uploaded to a h2 database
Credentials for said user are as follows:
```
username: james
password: password
email: example@gmail.com
```

#### When running email verification and password reset
A dummy email has been set up to be used, with the email `dev.dummy@gmail.com`. and will either send you a password
reset token or an email verification token containing a string a characters to input back in the website.

### running the UI application

to run simply go to your terminal and run `npm start` there website will automatically load up on port `3000`.