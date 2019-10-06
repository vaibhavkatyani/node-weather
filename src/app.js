const path = require('path');
const express = require('express');
const hbs = require('hbs');
const getForecast = require('../src/utils/forecast')
const getGeoCode = require('../src/utils/geocode')

const app = express();

const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname,'../public');
const viewPath = path.join(__dirname,'../templates/views');
const partialViewPath = path.join(__dirname,'../templates/partials');

app.set('view engine', 'hbs');
app.use(express.static(publicPath, {extensions:['html']}))
app.set('views',viewPath);
hbs.registerPartials(partialViewPath);

app.get('', (req, res) => {
    res.render('index',{
        title:"Weather",
        name:'Vaibhav Mishra'
    });
});

app.get('/about',(req, res)=>{
    res.render('about',{
        title:"About me",
        name:'Vaibhav Mishra'
    });
})

app.get('/help',(req, res)=>{
 res.render('help',{
     title:"Help",
     msg:"How can I help you",
     name:'Vaibhav Mishra'
 });
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address){
        return res.send({
            error:"Please provide an address"
        });
    }else{
        getGeoCode(address,(error, response)=>{
            if(error){
                return res.send({
                    error:error
                });
            }else{
                getForecast(response.longitude, response.latitude,(fErr, fres)=>{
                    if(fErr){
                        return res.send({
                            error:fErr
                        }); 
                    }else{
                            res.send({
                            forecast:`It is currently ${fres.temprature} degrees out in. There is a ${fres.rainProbability}% chances of rain`,
                            location:response.locationName,
                            address:address
                        });
                    }
                })
            }

        });
    }
});

app.get('/products',(req, res)=>{
    console.log(req.query.search)
    if(!req.query.search){
        return res.send({
            error:"You must provide search term."
        });
    }
    res.send({
        products:[]
    })
});

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:"Help",
        error:"Help not found.",
        name:'Vaibhav Mishra'
    })
});

app.get('*',(req, res)=>{
    res.render('404',{
        title:"Weather",
        error:"404: Page not found.",
        name:'Vaibhav Mishra'
    })
});

app.listen(port, () => {
    console.log('Server is up on port '+port)
});