const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

app.use(bodyParser.json());

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'learn_express'
});

conn.connect((err)=>{
    if(err) throw err;
    console.log('mysql Connected..')
});

// tampilkan semua data product
app.get('/api/products',(req,res)=>{
    let sql = "SELECT * FROM product";
    let query = conn.query(sql,(err,results)=>{
        if(err) throw err;
        res.send({"status":200,"error":null,"response":results});
    })
});

app.post('/api/products',(req,res)=>{
    let data = {product_name:req.body.product_name,product_price:req.body.product_price};
    let sql = "INSERT INTO product SET ?";
    let query = conn.query(sql,data,(err,results)=>{
        if(err) throw err;
        res.send({"status":200,"error":null,"response":results});
    });
});

app.put('/api/products/:id',(req,res)=>{
    let sql = "UPDATE product SET product_name='"+req.body.product_name+"',product_price='"+req.body.product_price+"' WHERE product_id="+ req.params.id;
    let query = conn.query(sql,(err,results)=>{
        res.send({"status":200,"error":null,"response":results});
    });
});

app.delete('/api/products/:id',(req,res)=>{
    let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
    let query = conn.query(sql,(err,results)=>{
        if(err) throw err;
        res.send({"status":200,"error":null,"response":results});
    })
})

app.listen(3000,()=>{
    console.log("server started on port 3000");
});
