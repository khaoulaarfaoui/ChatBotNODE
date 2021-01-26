# Creating  Facebook Messenger bot


You can read the  [documentation](https://developers.facebook.com/docs/messenger-platform/quickstart) the Messenger team prepared 

## 🙌 Get set


### *Build the server*

1. Install the Heroku CLI from here https://devcenter.heroku.com/articles/heroku-cli#download-and-install to launch, stop and monitor instances.


2. Install Node from here https://nodejs.org, this will be the server environment. Then open up Terminal or Command Line Prompt and make sure you've got the very most recent version of npm by installing it again:

    ```
    sudo npm install npm -g
    ```

3. Create a new folder somewhere and let's create a new Node project. Hit Enter to accept the defaults.

    ```
    npm init
    ```

4. Install the additional Node dependencies. Express is for the server, request is for sending out messages and body-parser is to process messages.

    ```
    npm install express request body-parser --save
    ```

5. Create an index.js file in the folder and start coding into it. We will start by authenticating the bot.

  

6. Make a file called Procfile and copy this. This is so Heroku can know what file to run.

    ```
    web: node index.js
    ```

7. Commit all the code with Git then create a new Heroku instance and push the code to the cloud.

    ```
    git init
    git add .
    git commit --message "hello world"
    heroku create
    git push heroku master
    ```
