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

app.get("/customer",(req,res)=>{
    const sql ="SELECT * FROM Bank.customer";
    db.query(sql,(err,data)=>{
        if(err)return res.json("Error");
        return res.json(data);

    })

})
app.listen(PORT,() => {
    console.log("Listning...")
})