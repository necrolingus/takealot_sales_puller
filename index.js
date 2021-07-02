const axios = require('axios').default; //import axios from 'axios'; //this is es6, it is the same as above
const initDB = require("./controllers/createDb");
const dbConfig = require("./config/dbConfig");
const db = require("./models/mainModel");
const soldItemModel = db.soldItemModel
const Op = db.Sequelize.Op

const pageSize = 100
const date_today = new Date().toISOString().slice(0,10);
const url = `https://seller-api.takealot.com/v2/sales/?page_size=${pageSize}&filters=start_date:${process.env.API_START_DATE}&filters=end_date:${date_today}`
const config = {headers: {Authorization: 'Key ' + process.env.API_KEY,}}



function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function syncDB() {
	return new Promise((resolve, reject) => {
		db.sequelize.sync({force: dbConfig.forceDbRecreate}).then(() => {
			resolve('Drop and re-sync db successful')
		}).catch((err) => {
			reject('Drop and re-sync db failed: ' + err)
		});
	});
}

async function insertData(val) {
	return new Promise((resolve, reject) => {
		soldItemModel.create(val)
		.then(data => {
			resolve('Record inserted')
		})
		.catch(err => {
			reject('Error: Record not inserted: ' + err)
		});
		
	})
}

async function getSales() {
    try {
		let combinedSales = []
        const response = await axios.get(url, config)
        
		totalRecords = response.data.page_summary.total
        numPages = Math.round(totalRecords/pageSize) + 1
		
		//get the sales and add it to big array
		sales = response.data.sales
		combinedSales = combinedSales.concat(sales)
		
		//If the first request is not 200, then stop
		if (response.status !== 200){
			return {'Error':'HTTP response code: ' + response.status}
		}
		
		//Loop through the page numbers (there is a bug in TL API where you must pass 
		//start and end date otherwise page_number returns only the first 2 pages)
		for (let i = 2; i <= numPages; i++){
			await sleep(2000) //so we dont get rate limited
			console.log('Getting data. Loop ' + i + ' of ' + numPages)
			let newUrl = url + "&page_number="+i
			const response = await axios.get(url, config)
			
			//get the sales and add it to big array
			sales = response.data.sales
			combinedSales = combinedSales.concat(sales)
		}
		return {'Outcome': combinedSales}
	
	} catch(err){
		return {'Error':err['errno']}
	}
	
}
 
async function letsStart (){
	//create the DB and table
	const initializeDb = await initDB.createDb(dbConfig.dBDialect);
	const sales = await getSales();
	
	if (initializeDb){
		console.log(initializeDb) //an error occurred 
	} else {
		if ('Error' in sales){
			console.log('You had an error: ' + sales)
		}
		else {
			salesArray = sales['Outcome']
			console.log('This many records to insert: ' + salesArray.length)
			
			await syncDB()
			for(const val of salesArray) {
				await insertData(val)
			}
			console.log('DONE')
			process.exit()
		}
	}
}

letsStart();

