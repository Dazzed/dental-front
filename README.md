DentalHQ Frontend
================================================================================
React Boilerplate Docs can be found in `docs/`.


Setup
================================================================================

Local Client
------------------------------------------------------------
 0. Setup the server locally first.

 1. Get it running:

    ```
npm install
npm start
# Opens at localhost:3000
    ```

 2. Create a dentist and user account to test with.  Note that you'll have to
    look at the server process's email output to find the activation link after
    signing up the dentist account.

    ```
http://localhost:3000/accounts/dentist-signup
http://localhost:3000/accounts/signup
    ```

Heroku
------------------------------------------------------------
**NOTE:** Only for first time setup.  See "Deployment" below for regular use.

Useful Links:

  * `docs/general/deployment.md`

Setup Steps:

 1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

 2. Configure heroku.

    ```
heroku git:remote -a dentalhq-dev-client
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-nodejs#v93 -a dentalhq-dev-client
heroku config:set NPM_CONFIG_PRODUCTION=false
git push heroku master
    ```

Development
================================================================================
Run `npm start` to see your app at `localhost:3000`.
