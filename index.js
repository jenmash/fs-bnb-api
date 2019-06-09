const express = require("express");
const cors = require("cors");

// const connection = require("./src/database/db");
const User = require("./src/models/user");
const Property = require("./src/models/property");

const app = express();
const config = {
    host: "localhost",
    port: 3306,
    user: "root",
    password: "rootroot",
    database: "fs_bnb"
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);
connection.connect();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


var users = new Array();
var properties = new Array();
var bookingReqs = new Array();
let usersCount = 0;
let propertiesCount = 0;
let bookingsCount = 0;

// users.push({
//     email: "a", password: "a"
// });


app.post("/users/authentication", (req, res) => {
    const user = req.body;
    bodyEmail = user.email;
    bodyPassword = user.password;

    User.getUserByEmail(bodyEmail, (err, result) => {
        if (err) {
            return res.status(404).json({message: "Failed to check login. Technical error."});
        } else {
            if (result.length == 0) {
                return res.status(401).json({message: "Invalid email"});
            }

            if (result[0].password === bodyPassword) {
                return res.json(result[0]);
            }
            else {
                return res.status(404).json({message: "Incorrect password"});
            }
        }
    });

    // let foundUser = null;
    // for (var k = 0; k < users.length; ++k) {
    //     if (users[k].email === bodyEmail) {
    //         if (users[k].password === bodyPassword) {
    //             foundUser = users[k];
    //         }
    //     }
    // }


    // connection.query("SELECT * FROM user WHERE email = ? AND password = ?", [bodyEmail, bodyPassword], (err, result) => {
    //     if (err) {
    //         console.log(err);

    //         if (err.code === 'ER_DUP_ENTRY') {
    //             return res.status(400).json({ message: err.sqlMessage });

    //         } else {

    //             return res.status(500).json({ message: "Failed to insert. Please try again." });
    //         }

    //         console.log(result);

    //         var responseUser = {
    //             id: result.insertId,
    //             name: result.name,
    //             email: user.email,
    //             password: user.password
    //         };

    //         return res.status(200).json(responseUser);

        
    // }});

    // if (foundUser != null) {
    //     return res.status(200).json({message: "login successful"});
    // }
    // return res.status(404).json({message: "user not found"});

});

//making new user
app.post("/users", (req, res) => {
    const user = req.body;

    connection.query("INSERT INTO user set ?", user, (err, result) => {
        if (err) {
            console.log(err);

            if(err.code ==='ER_DUP_ENTRY') {
                return res.status(400).json({ message: err.sqlMessage });
            } else {
                return res.status(500).json({ message: "Failed to insert"});
            }
        }

        var newUser = {
            id: result.insertId,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            password: user.password
        };
        // users.push(newUser);
        return res.status(200).json(newUser);
    });

        
        
    

    // var foundUser = null;
    // users.forEach((aUser) => {
    //     if (aUser.email === bodyEmail) {
    //         foundUser = aUser;
    //     }
    // });
          
    // if (foundUser != null) {
    //     return res.status(404).json({message: "user exists with the same email"});
    // }

            

});
            
app.post("/properties", (req, res) => {
    const property = req.body;
    const bodyName = property.name;
    const bodyLocation = property.location;
    const bodyImageUrl = property.imageUrl;
    const bodyprice = property.price;

    var newProp = {
        id: ++propertiesCount,
        name: bodyName,
        location: bodyLocation,
        imageUrl: bodyImageUrl,
        price: bodyprice,
    };

    Property.createProperty(newProp, (err, result) => {
        res.json(newProp);
    })
});     

app.get("/properties/:id", (req, res) => {
    const propId = req.params.id;
    Property.getPropertyById(propId, (err, result) => {
        res.json(result);
    })
});

app.delete("/properties/:id", (req, res) => {
    properties = properties.filter(property => 
        !(property.id === parseInt(req.params.id)));
});

app.post("/properties/:id/bookings", (req, res) => {
    
    const bookings = req.body;
    const bodydateFrom = bookings.datefrom;
    const bodydateTo = property.dateTo;
    const bodyuserId = property.userId;
    

    var newProp = {
        id: ++bookingsCount,
        dateFrom: bodydateFrom,
        dateTo: bodydateTo,
        userId: bodyuserId,
        propertyId: parseInt(req.params.id),
        status: "NEW"
    };

});  

app.get("/properties/:id/bookings", (req, res) => {
    properties.forEach(property => {
        if (property.id === parseInt(req.params.id)) {
            return res.json(property);
        }
    });
});

app.get("/properties", (req, res) => {
    connection.query("Select * from property", (err, result) => {
        if(err) {
            console.log("error");
            return res.status(500).json({message: "Failed"});
        }
        else {
            console.log(result);
            return res.status(200).json(result);
        }
    })
    // console.log("here");
    // Property.getAllProperties((err, result) => {
    //     console.log("here");
    //     res.json(result);
    // })
});


app.listen(3000, ()=>console.log("server is valid"));
           
            




