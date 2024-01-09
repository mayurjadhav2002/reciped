const express = require('express');
var cors = require('cors');
const { Connect } = require('./config/connect');
require('dotenv').config()
const port = process.env.PORT;
const userRoute = require('./routes/userRoute')
const recipe_route = require('./routes/RecipeRoute');
const imageRoute = require('./routes/ImageUploadRoute');


const app = express();
app.use(cors());
app.use('/static', express.static(__dirname + '/public'));

Connect();

// User routes
app.use('/auth', userRoute)
app.use('/recipe', recipe_route)
app.use('/uploadImage', imageRoute)
app.get('/', (req,res)=>{
    res.send("hello World")
})

app.listen(port, () => console.log(`Connected to port: ${port}`));