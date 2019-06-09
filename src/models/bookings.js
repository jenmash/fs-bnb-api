var mysqlConn = require("../database/db");

var Booking = function(booking) {
    this.userid = bookings.userid;
        
    this.datefrom = booking.datefrom;
    this.dateto = booking.dateto;
    this.id = booking.propertyid;
//this.date_created = new Date ();

    // this.createUser = function(data, result) {

        // }
};


Booking.createBooking = function(newBooking, result) {
    mysqlConn.query("INSER INTO booking set ?", newBooking, function(err, res) {
        if (err) {
            console.log("error: err");
            result(err, null);
    } else {
        console.log(res.insertId);
        result(null, res.insertId);
    }
})
};

Booking.getAllBookings = function(result) {
    mysqlConn.query("Select * from booking", function(err,res) {
        if (err) {
        console.log("error: ", err);
        result(err, null);
    } else {
        console.log("Bookings :", res);
        result(null, res);
    }
    });
};

Booking.getBookingById = function(bookingId, result) {
    mysqlConn.query("Select * from booking where id = ?", bookingId, function(
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


Booking.updateBookingById = function(bookingId, accomodation, location, price) {
    mysqlConn.query(
        "UPDATE booking SET accomodation = ?, location = ?, price = ? WHERE id = ?",
        [accomodation, location, price, propertyId],
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
module.exports = Booking;