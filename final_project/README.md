# Web Programming FINAL

## Setup
### 1. ***dependencies***  
first, install some packages 
``` 
### at './final_project' directory
yarn install
```
### 2. ***database setup***
find or create a .env.local file in the backend, and add some variables. Can take a look at .env.example
Then add your connection string which can be obtained from your local PostgreSQL or Railway Postgres.
```{
### in .env.local file  
POSTGRES_URL=
OPENAI_KEY=
```
* local PostgreSQL (the way I worked on my homework)
1. edit the file *docker-compose.yml*
2. paste `"POSTGRES_URL=postgres://postgres:postgres@localhost:5432/final"` to *.env.local file*
3. `docker compose up` start the database
4. `yarn migrate` setting the table
5. `yarn dev` start the app


## Usage
* ADD NEW HATE: When first opening the website, you can create a hate writing with filling some data in the add dialog.
* POST A HATE: Enter the the hate page you create, you can type anything in the textarera then submmit, and gpt will give some review on you writing.
* COMMENT ON OTHER HATE: At the main page, you can enter your username and use this to comment on others post or will be anonymous.
* HOME BUTTON: Click the title "HateWithGPT or home icon at top right can go back to home page.

## API
1. card
   * GET by id: get card bby card id
   * GET all: get all cards
   * POST: add new card
2. chat
   * POST: get the response from gpt (chat with gpt)
3. comments
   * POST: create a new comment
   * GET: get all comment related to the card page
4. writing
   * GET: get the writing content by card id
   * POST: initialize the writing
   * PUT: update the writing with ai review and new content
