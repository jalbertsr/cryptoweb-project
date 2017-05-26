const maxLength = 50;
var x = ['x']; 
var btc = [];
var eth = [];
var interval;

function getName(object){
	return object.name; 
}

function getPrice(object){
	return object.price_eur;
}


$(function(){

	var limit = 25; //future var for modifiy limit 

	interval = setInterval(()=>{
		//get api data convert = EUR limit= 25 
		$.getJSON('https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit='+limit, function(data){
			console.log(data);

			var chart = c3.generate({
		    bindto: '#chart',
		    data: {
		      x: 'x',
		      columns: [x, btc, eth],
		      types: {
		            btc: 'area',
		            eth: 'area-spline'
		        }
		  	},
		      axis: {
		      	x : {
		      		type: 'timeseries',
		      		tick: { format: '%H:%M:%S'}
		      	}
		      }
			});

			if(btc.length<1){
				btc.push(getName(data[0]));
				eth.push(getName(data[1]));
			}

			btc.push(getPrice(data[0]));
			eth.push(getPrice(data[1]));

			console.log('Interval executed');	
			console.log(btc);
			console.log(eth);

			x.push( +new Date());

			if(btc.length < maxLength){
				chart.load({
					columns: [x, btc, eth]
				});
			}
			else{
				chart.flow({
					columns: [
						['x', +new Date()],
						[getName(data[0]), getPrice(data[0])],
						[getName(data[1]), getPrice(data[1])]
					]
				});
			}
		});		
	}, 60000);
}) 



/*
$(function(){
  var location;
  
  $.getJSON('https://ipinfo.io', function(data){
    location = data.loc.split(",");
    
    $.getJSON("http://api.openweathermap.org/data/2.5/weather?units=metric&lat="+location[0]+"&lon="+location[1]+"&APPID="+API_KEY, function(wdata){
      console.log(wdata);
      
      putData(wdata, unit);
      
      $("#target").click(function(){
        unit = !unit;
        
        putData(wdata, unit);
        })
      })
   })
})
*/