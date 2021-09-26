const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const http = require('https');


const app = express();

app.use(express.static("pub"));

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req,res){
  res.sendFile(__dirname+"/signup.html");
});

app.post("/", function(req,res){
  const fname = req.body.firstname;
  const lname = req.body.lastname;
  const mail = req.body.email;
  const url = "https://us5.api.mailchimp.com/3.0/lists/7b5f58aa26"


  var data = {
    members:[
      {
        email_address: mail,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }
      }
    ]
  };

const jsondata = JSON.stringify(data);

  const option={
    method:'POST',
    auth: 'jegajeeth1:4d28188f7591d94c05e6e639029237a4-us5'
  };

  const request = http.request(url,option,function(response){
    response.on("data",function(data){
      const jd = JSON.parse(data)
      // console.log(jd);
      if(jd.error_count === 0){
        res.sendFile(__dirname+"/success.html");
      }
      else{
        res.sendFile(__dirname+"/failure.html");
      }
    })
  })

  request.write(jsondata);
  request.end();
});

app.post("/failure.html", function(req,res){
  res.redirect("/");
});

app.listen(3000, function(){
  console.log("server is started at port 3000");
})



// listid
// 7b5f58aa26

// mailchimp api key
// 4d28188f7591d94c05e6e639029237a4-us5
