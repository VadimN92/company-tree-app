var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var config = require("config.json")("./config.json");

var Company = require("./libs/db");


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

// Add url for directory 'bower_components'.
app.use('/bower_components', express.static(__dirname + '/bower_components/'));



/*var newCompany = new Company({
    name: "COCO",
    annual: 233.56,
    subsidiaries: [" 575140bf29cf83f43d589894", " 575140bf29cf83f43d589894"]
});*/

/*newCompany.save(function(err) {
    if (err) throw err;

    console.log("Success saving");
});*/
/*Company.find({}, function(err, docs) {
    console.log(docs);
});*/
/*Company.remove(function (err, docs) {
    console.log(err);
    console.log(docs);
});*/
app.get('/api/getListCompanies', function(req, res) {
    console.log("Looking for all companies list");
    Company.find({}, function(err, docs) {
        // need check errors
        console.log(docs);
        res.json(docs);
    });
});
app.get('/api/getCompanies', function(req, res) {
    list = [];
    Company.find({parent_id: false}, function(err, docs) {

        var parent_count = 0;
        for(index in docs) {
            parent_count = index;
        }

        /*var promise = new Promise(function(resolve, reject) {
            for(index in docs) {
                list.push(docs[index].toObject());
                list[index].childs = [];
                console.log(parent_count);
                buildListCompanies(docs[index], list[index].childs);
            }
            resolve(res.json(list));
        };*/
        for(index in docs) {
            list.push(docs[index].toObject());
            list[index].childs = [];
            console.log(parent_count);
            buildListCompanies(docs[index], list[index].childs);
        }

/*        docs.forEach(function (item, index) {
            list.push(item.toObject());
            list[index].childs = [];
            buildListCompanies(item, list[index].childs);
        });*/
        setTimeout(function() {
         res.json(list);
         }, 1000);

    });
});



function buildListCompanies(parent, childs) {
    Company.find({parent_id: parent._id}, function(err, docs) {
        /*console.log("*******************");
        console.log(docs);
        console.log("*******************");*/
        //childs.push(docs);

        /*console.log("*******************");
        console.log(parent.childs, parent);
        console.log(parent);
        console.log("*******************");*/
        var cl_count;
        for(index in docs) {
            cl_count = index;
        }
        for(index in docs) {
            childs.push(docs[index].toObject());
            childs[index].childs = [];
            buildListCompanies(docs[index], childs[index].childs);
        }
        /*docs.forEach(function (item, index) {
            childs.push(item.toObject());
            childs[index].childs = [];
            buildListCompanies(item, childs[index].childs);
        });*/

        /*console.log(list);
        console.log("*******************");*/
    });
}


app.post('/api/newCompany', function(req, res) {
    console.log(req.body);
    var parent = false;
    if(req.body.companyType.type == "subsidiaryCompany") {
        parent = req.body.companyType.parentId;
    }
    var newCompany = new Company({
        name: req.body.name,
        annual: req.body.annual,
        parent_id: parent
    });
    newCompany.save(function(err) {
        if (err) throw err;

        console.log("Success saving");
        res.send("ok");
    });
});

app.post("/api/deleteCompany", function(req, res) {
    console.log("open");
    console.log(req.body.id);
    res.json(req.body.id);
});


app.listen(config.port, function () {
    console.log("Server run! http://localhost:" + config.port);
})