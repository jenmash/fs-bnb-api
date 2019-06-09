// var user = {
//     firstname: "Jen"
// };

// var User = function(firstname) {
//     this.firstname = firstname;
// }

// var user = User("Jen")

// class User {
//     constructor(firstname) {
//         this.firstname = firstname;
//     }
// }


// var User = function(user) {
//     this.name = user.name;
//     this.surname = user.surname;
// }
// var user = new User("Jen");

var mysqlConn = require("../database/db");

var User = function(user) {
    this.name = user.name;
        // this.surname = user.surname;
        // this.cellPhone = user.cellPhone;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
//this.date_created = new Date ();

    // this.createUser = function(data, result) {

        // }
};


User.createUser = function(newUser, result) {
    mysqlConn.query("INSER INTO user set ?", newUser, function(err, res) {
        if (err) {
            console.log("error: err");
            result(err, null);
    } else {
        console.log(res.insertId);
        result(null, res.insertId);
    }
})
};

User.getAllUsers = function(result) {
    mysqlConn.query("Select * from user", function(err,res) {
        if (err) {
        console.log("error: ", err);
        result(err, null);
    } else {
        console.log("Users :", res);
        result(null, res);
    }
    });
};

User.getUserById = function(userId, result) {
    mysqlConn.query("Select * from user where id = ?", userId, function(
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

User.getUserByEmail = function(userEmail, result) {
    mysqlConn.query("Select * from user where email = ?", userEmail, function(
        err,
        res
) {
    if (err) {
        console.log("error: ", err);
        result(err, null);
    } else {
        result(null, res);
    }
});
};

User.updateUserById = function(userId, name, role, email, password, result) {
    mysqlConn.query(
        "UPDATE user SET name = ?, role = ?, email = ?, password = ? WHERE id = ?",
        [name, role, email, password, userId],
        function(err, res) {
            if (err) {
                console.log("error: ", err);
                result(null, err);
            } else {
                result(null, res);
            }
        }
    );
};

User.removeUser = function(userId, result) {
    mysqlConn.query("DELETE FROM user WHERE id = ?", userId, function(err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
        });
    };
module.exports = User;



