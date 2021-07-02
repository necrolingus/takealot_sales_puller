# takealot_sales_puller

## How to use it

You can schedule this to run in Cron or the like  
Raname .env.sample to .env and add the relevant details (Your takealot API key will go in here).


## What is left to do
#### Dedupe
Right now keep forceDbRecreate as true in dbConfig.js as the application pulls all sales and inserts all sales into the DB every time it runs, so maybe only run it once per day or so.  
It does not take long though to pull and insert all records. It takes but a few seconds for 800 records or so (this includes a 2 second sleep to prevent rate limiting).


### Email new sales
A feature to email new sales could be nice.
