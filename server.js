const express =require ('express')
const port = process.env.PORT || 4000

const app = require('./app')
const connectDatabase = require('./config/database')
// const dotenv = require('dotenv');
const cloudinary = require('cloudinary')
const path= require('path')
// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})

// Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'config/config.env' })

// dotenv.config({ path: 'backend/config/config.env' })


// Connecting to database
connectDatabase();

// Setting up cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const server = app.listen(port, () => {
    console.log(`Server started on PORT: ${port} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})


//setting for deployement 

app.use(express.static(path.join (__dirname , 'frontend1' , 'build' )))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend1','build','index.html'))
})