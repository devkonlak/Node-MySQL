const express =require('express');
const mysql = require ('mysql');

const app = express();
const PORT = 8081;
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Kong@rasu07",
    database:"Bank"
})

app.use(express.json())

// GET fetch all customers
/*
app.get("/customer",(req,res)=>{
    const sql ="SELECT * FROM Bank.customer";
    db.query(sql,(err,data)=>{
        if(err)return res.json("Error");
        return res.json(data);

    })

})
*/
// fetch all customer id
app.get("/customer",(req,res) =>{
    const sql = "SELECT cust_id FROM Bank.customer";
    db.query(sql,(err,data) =>{
        if(err)
            {
                return res.status(500).json("Error");
            }

        return res.status(200).json(data);
})
})
// fetch customer details based on cust_id
app.get("/customer/:cust_id", (req, res) => {
    const { cust_id } = req.params;
    const sql = "SELECT * FROM customer WHERE cust_id = ?";
    db.query(sql, [cust_id], (err, data) => {
        if (err) {
           
            return res.status(500).json({ error: 'Error' });
        }
        if (data.length === 0) {
            return res.status(404).json({ error: 'Customer not found' });
        }
        return res.status(200).json(data[0]);
    });
});

// POST add a new customer

app.post("/customer", (req, res) => {
    const { cust_id,First_name, Last_name, city, mobile_no, occupation, dob } = req.body;
    const sql = "INSERT INTO customer (cust_id,First_name, Last_name, city, mobile_no, occupation, dob) VALUES (?, ?, ?, ?, ?, ?,?)";
    db.query(sql, [cust_id,First_name, Last_name, city, mobile_no, occupation, dob], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({error:'Error',details:err.message});
        }
        return res.status(201).json("Customer added successfully");
    });
});

// Updating mobile_no based on cust_id

app.put("/customer/:cust_id",(req,res) =>{

    const {cust_id} = req.params;
    const {mobile_no} = req.body;
    const sql = "UPDATE customer SET mobile_no = ? WHERE cust_id = ?";
    db.query(sql, [cust_id,mobile_no], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error', details: err.message });
        }
        return res.status(200).json(`Customer ${cust_id} phone number updated to ${mobile_no} successfully`);
    });
});

// Deleting a customer

app.delete("/customer/:cust_id",(req,res)=>{
    const {cust_id} = req.params;
    const sql = "DELETE FROM customer WHERE cust_id=?";

    db.query(sql,[cust_id],(err)=>
    {
        if(err){
            console.error(err);
            return res.status(500).json({error: 'Error',details:err.message});

        }
        return res.status(200).json(`Customer with ID ${cust_id} is deleted succesfullty`)
    })
})



app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`)
})