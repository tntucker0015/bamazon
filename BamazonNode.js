var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = "";

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
  // queryData();
  runSearch();
});

function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.table(res);
    // connection.end();
  });
};

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Purchase a Product by id",
        "Purchase a product by product Name",
        "Post an Item on Bamazon for sale",
        "EXIT"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Purchase a Product by id":
        idQuery();
        break;

      case "Purchase a product by product Name":
        nameQuery();
        break;

      case "Post an Item on Bamazon for sale":
        sellItem();
        break;

      case "EXIT":
        connection.end();
        break;
      }
    });
}

function idQuery() {
  inquirer.prompt([{
          type: "input",
          name: "id",
          message: "What item ID Number are you looking to purchase?"
      },
      {
        name: "purchaseQuantity",
        message: "How many would you like to Purchase?"
      }
  ]).then(function (inquiry) {
      var productId = inquiry.id;
      connection.query("SELECT * FROM products WHERE id LIKE '%" + productId + "%' LIMIT 1;", function (err, results) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.table(results.productId);
          // runSearch();
      //     connection.end();          
      });
  })
};


function nameQuery() {
  inquirer.prompt([{
          type: "input",
          name: "product_Name",
          message: "What product are you looking for?"
      }

  ]).then(function (inquiry) {
      var productName = inquiry.product_name;
      connection.query("SELECT * FROM products WHERE product_name LIKE '%" + productName + "%' LIMIT 5;", function (err, results) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.log(results);
          runSearch();
      });
  })
};

function sellItem() {
  inquirer.prompt([{
          type: "input",
          name: "product_Name",
          message: "What product are you looking for?"
      }

  ]).then(function (inquiry) {
      var productName = inquiry.product_name;
      var newPrice = "";
      const confirmation = "Is this correct?";
      connection.query("SELECT * FROM products WHERE product_name LIKE '%" + productName + "%' LIMIT 5;", function (err, results) {
          if (err) throw err;
          // Log all results of the SELECT statement
          console.log(results);
          console.log("you have Just Posted " + productName + "for sale for the amount of $" + newPrice + ".");
          console.log(confirmation);
          runSearch();
      });
  })
};

