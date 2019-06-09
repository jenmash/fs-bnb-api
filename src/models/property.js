var mysqlConn = require("../database/db");

var Property = function(Property) {
    this.title = property.title;
        // this.surname = user.surname;
        // this.cellPhone = user.cellPhone;
    this.location = property.location;
    this.description = property.description;
    this.pricePerNight = property.pricePerNight;
    this.id = property.id;
    this.userid = property.userid;
//this.date_created = new Date ();

    // this.createUser = function(data, result) {

        // }
};


Property.createProperty = function(newProperty, result) {
    mysqlConn.query("INSERT INTO property set ?", newProperty, function(err, res) {
        if (err) {
            console.log("error: err");
            result(err, null);
    } else {
        console.log(res.insertId);
        result(null, res.insertId);
    }
})
};

Property.getAllProperties = function(result) {
    console.log("in here");
    mysqlConn.query("Select * from property", function(err,res)  {
        if (err) {
        console.log("error: ", err);
        result(err, null);
    } else {
        console.log("Properties :", res);
        result(null, res);
    }
    });
};

Property.getPropertyById = function(propertyId, result) {
    mysqlConn.query("Select * from property where id = ?", propertyId, function(
        err, 
        res
    ) {
    if (err) {
        console.log("error:", err);
        result(err, null);
    } else {
        result(null, res);
    }
});
};

// Use for provider sider
// Property.updatePropertyById = function(propertyId, accomodation, location, price) {
//     mysqlConn.query(
//         "UPDATE property SET name = ?, role = ?, email = ?, password = ? WHERE id = ?",
//         [name, role, email, password, userId],
//         function(err, res) {
//             if (err) {
//                 console.log("error: ", err);
//                 result(null, err);
//             } else {
//                 result(null, res);
//             }
//         }
//     );
// };

// User.removeUser = function(userId, result) {
//     mysqlConn.query("DELETE FROM user WHERE id = ?", userId, function(err, res) {
//         if (err) {
//             console.log("error: ", err);
//             result(null, err);
//         } else {
//             result(null, res);
//         }
//         });
//     };
module.exports = Property;