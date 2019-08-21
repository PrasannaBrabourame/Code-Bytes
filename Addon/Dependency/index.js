var express        =         require("express");
var bodyParser     =         require("body-parser");
var app            =         express();
var request = require('request');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
  res.sendfile("index.html");
});

app.post('/getdependency',function(req,res){
  var depname=req.body.depname;
var dependency = getpackage(depname);
res.send(dependency);
 });


async function getdependency(packageName) {
return new Promise(async (resolve, reject) => {
        request("http://registry.npmjs.org/"+packageName+"/latest", function (error, response, body) {
            if (response && response.statusCode === 200) {
                let result = JSON.parse(body);
                let dependency = [];
                if (result.dependencies != undefined)
                    dependency = Object.keys(result.dependencies);
                 resolve(dependency);
//console.log(dependency);
            }
        });
});
}
function getpackage(packageName) {
    getdependency(packageName).then(value => {
        let dependency = [value];
        value.forEach(name => {
            let dependency1 = getdependency(name);
            if (dependency1 != undefined)
                dependency.push(dependency1);
        });
       return Promise.all(dependency);
    }).then(
        (result) => {
            var final = [];
            let dependency2 =final.concat.apply(final, result)
            dependency2 = [...new Set(dependency2)];
            console.log(JSON.stringify(dependency2));
           return JSON.stringify(dependency2)
        })
}
app.listen(3000,function(){
  console.log("Started on PORT 3000");
})


