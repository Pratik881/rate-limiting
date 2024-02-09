const express=require('express')
const cors=require('cors')
const routes=require('./routes/route')
const rateLimit=require('express-rate-limit')
const app=express()
//rate limiting
const limiter=rateLimit({
    windowMs:15*60*1000,
    max:100,//each IP can make 100 requests per windowmS,
    message:'too many requests try again later'
})
app.use(limiter)
app.set('trust-proxy',true)
app.use(cors())
app.use(express.static('public'))
app.use(routes)
require('dotenv').config()
const PORT=process.env.PORT || 5000
//enable cors

app.listen(PORT,()=>{
    console.log(`I am listening on  port ${PORT} `)
})