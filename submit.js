
let mysql = require("mysql2");
let express = require("express");
let methodOverride = require("method-override");
let app = express();

app.set("view engine", "ejs");

// Create MySQL connection
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'vehicleinsurance',
    password: 'Saikrishna@123'
});

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));

let port = 8080;

app.listen(port, () => {
    console.log("Server started");
});

app.get("/customer", (req, res) => {
    res.render("customerForm.ejs");
});

app.post("/submit", (req, res) => {
    const {  
        customerId, fname, lname,dob , gender, address, email, Passportnumber, maritalstatus, ppsnumber      // Include other fields from the form
    } = req.body;
    
    const q = 'INSERT INTO customer (cust_id, cust_fname, cust_lname, cust_dob, cust_gender, cust_address, cust_mob_number, cust_email, cust_passport_number, cust_marital_status, cust_pps_numbernumber) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

    connection.query(
        q, 
        [customerId, fname, lname,dob , gender, address, '100', email, Passportnumber, maritalstatus, ppsnumber], // Adjust with actual field values
        (err, results) => {
            if (err) {
                console.error("Error inserting customer:", err);
                res.status(500).send("Error inserting customer");
                return;
            }
            console.log("Customer inserted successfully:", results);
            res.redirect("/customer"); 
        }
    );
});

