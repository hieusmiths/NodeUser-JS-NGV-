var express = require('express');
var router = express.Router();
const fs = require('fs');

// https://node-postgres.com/features/connecting
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'fullStack',
  password: 'hieu9121998',
  port: 5432,
})




/* GET home page. */
router.get('/', function(req, res, next) {

  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })
  

  res.render('index', { title: 'Express' });
});

// api get data form postgres xóa đi sau khi thêm proxy cũng dk
router.get('/getData', function(req, res, next) { // lên Brower gõ localhost:4000/getdata để KT.
  

  //  Access Allow Controll - cho phép nào mới có thể truy cập
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // cho phép link này 

  // // Request methods you wish to allow
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // Những action nàu.

  // // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);


  pool.query('SELECT * FROM product', (err, response )=>{
    
    if(err){
      console.log(err);
    }
    else{
      // console.log(response.rows);
      res.send(response.rows);
      console.log('day la url api ');
    }
    // pool.end(); // đóng cổng kết nối
  });

  //res.render('index', { title: 'Express' }); // render ra html không cần vì nó
  // đẩy ra data nên xóa
});


// End get

// Start Add
  router.get('/addData', function(req, res, next ){

    res.render('add', { } );// views
  });

  router.post('/add', function(req, res, next ){
    
    var product_name = req.body.product_name,
        product_price = req.body.product_price,
        product_img  = req.body.product_img;
        console.log(req);
        pool.query('INSERT INTO product  (product_name, product_price, product_img) VALUES ($1 , $2, $3)',
        [product_name, product_price, product_img], // mảng ứng với 1 2 3
        (err, response) =>{
          if(err){
            res.send(err);
            res.send(0);
          }
          else{
            res.send(1);
          }
        });
  });
// End Add

module.exports = router;
