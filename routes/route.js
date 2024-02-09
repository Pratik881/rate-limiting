const express = require('express');
const router = express.Router();
const needle = require('needle');
const apicache=require('apicache')
require('dotenv').config()
let cache=apicache.middleware
// Using environment variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;
console.log(API_KEY_VALUE)
console.log(API_BASE_URL)
router.get('/api',cache('2 minutes'), async (req, res) => {
//   try {
//    // console.log(API_BASE_URL)
//     const queryParams = req.query; // Use req.query to get query parameters
//     console.log(queryParams)

//     // Create URLSearchParams object with query parameters
//     const params = new URLSearchParams({
//       [API_KEY_NAME]: API_KEY_VALUE,
//       ...queryParams,
//     });
//     console.log(params)
//     console.log(`${API_BASE_URL}?${params}`)

//     // Make HTTP request with needle
//     const apiResponse = await needle('get', `${API_BASE_URL}?${params}`);
//     const data = apiResponse.body;

//     res.json(data);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
try {
    const queryParams=req.query;
    let queryString=`${API_KEY_NAME}=${API_KEY_VALUE}`;
    for(key in queryParams){
        if(queryParams.hasOwnProperty(key)){
            queryString+=`&${key}=${encodeURIComponent(queryParams[key])}`
        }
    }
    console.log(queryString)
    const  apiResponse=await needle('get',`${API_BASE_URL}?${queryString}`)
    const data=apiResponse.body;
   return res.json(data)
} catch (error) {
    console.log(error.message)
}
});
module.exports = router;
