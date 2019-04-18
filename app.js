var express=require('express')
var app=express()

var bodyParser=require('body-parser')
var mongoose=require('mongoose')

//Connecting to mongodb using mongoose
mongoose.connect('mongodb://localhost/yelp_camp')



//Telling express to use the body-parser
app.use(bodyParser.urlencoded({extended:true}))


//Setting up the campground schema
var campgroundSchema =new mongoose.Schema({
	name:String,
	img:String
})
//creating a model for the schema
var Campground=mongoose.model('Campground',campgroundSchema)

//create a campground to make sure everything is working just fine
Campground.create(
	{
		name:'Boston club ignore',img:'https://farm4.staticflickr.com/3282/2770447094_2c64348643.jpg'

	}, function(err,campground){
		if(err){
			console.log(err)
		}else{
			console.log('NEWLY CREATED CAMPGROUND')
			console.log(campground)
		}
	}

	)






//making the array global so thatevery route has access to it
var campgrounds=[
{name:'NYC club ignore',img:'https://farm6.staticflickr.com/5181/5641024448_04fefbb64d.jpg'},
{name:'SF club ignore',img:'https://farm7.staticflickr.com/6014/6015893151_044a2af184.jpg'},
{name:'Boston club ignore',img:'https://farm4.staticflickr.com/3282/2770447094_2c64348643.jpg'}
]


//setting up ejs as view engine
app.set('view engine','ejs')


app.get('/',function(req,res){
	res.render('home')
})

app.get('/campgrounds',function(req,res){
	
	res.render('campgrounds',{campgrounds:campgrounds})
})


app.post('/campgrounds',function(req,res){
	//get the data from the form and add it to the campgrounds array
	var name=req.body.name
	var image=req.body.image
	var newCampground={name:name,img:image}
	campgrounds.push(newCampground)
	//redirecting to the display campgrounds page
	res.redirect('/campgrounds')
})

//show the form that will send a new request and post it to /campgrounds
app.get('/campgrounds/new',function(req,res){
	res.render('new')
})

app.listen(process.env.PORT|| 3000,function(req,res){
	console.log('Server is up and running at port 3000')

})