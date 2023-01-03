const express = require('express'); 
const cors = require('cors'); 
const app = express();
const http = require('http').Server(app);
const axios = require('axios'); 
const cheerio = require('cheerio'); 


const port = process.env.port || 8000 ;

app.use(cors());

function test(req, res, next){
    console.log("yep now");
    var Url = 'https://www.oxfordlearnersdictionaries.com/definition/english/'+req.params.word+'?q='+req.params.word;
    axios.get(Url) 
    .then(({ data }) => {

    	const $ = cheerio.load(data); 
        const pokemonNames = $('.def') 
        .map((_, product) => { 
            const $product = $(product); 
            return $product.text() 
        }) 
        .toArray(); 

        console.log(pokemonNames)
        res.json(pokemonNames);
    });
}

app.get(('/api/:word'), test);

http.listen(port, () => {
    console.log("HTTP Server Started")    
})
