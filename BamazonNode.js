
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
  runSearch();
});

function start() {
  connection.query("SELECT * FROM products", function (err, res) {
    if (err) throw err;
    console.log(res);
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
        "Post an Item on Bamazon for sale",
        "EXIT"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Purchase a Product by id":
          buyItem();
          break;

        case "Post an Item on Bamazon for sale":
          sellItem();
          break;

        case "EXIT":
          console.log('');
          console.log("=============================================================");
          console.log("Goodbye, Have a great Day!");
          console.log("=============================================================");
          console.log('');
          connection.end();
          break;
      }
    });
}

function buyItem() {
  connection.query("SELECT * FROM products", function (err, results) {
    if (err) throw err;
    inquirer.prompt([{
          type: "rawlist",
          name: "id",
          choices: function () {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What item are you looking to purchase?"
        },
        {
          name: "purchaseQuantity",
          type: "input",
          message: "How many would you like to Purchase?"
        }
      ])
      .then(function (answer) {
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === answer.id) {
              chosenItem = results[i];
            }
          }
          console.log(chosenItem);
          if (chosenItem.stock_quantity > parseInt(answer.purchaseQuantity)) {
              connection.query(
                "UPDATE products SET ? where ?", 
                [{
                    stock_quantity: (chosenItem.stock_quantity - answer.purchaseQuantity)
                  },
                  {
                    id: chosenItem.id
                  }
                ],
                function (err) {
                  if (err) throw err;
                  console.log('');
                  console.log("=============================================================");
                  console.log("Item PUrchased: " + chosenItem.product_name);
                  console.log("Quantity Purchased: " + answer.purchaseQuantity );
                  console.log("Total Price: " + (chosenItem.price * answer.purchaseQuantity));
                  console.log("=============================================================");
                  console.log('');
                  runSearch();
                },
              );
            }
            else {
              // bid wasn't high enough, so apologize and start over
              console.log('');
              console.log("=============================================================");
              console.log("You tried to purchase more items than we have in stock...try again");
              console.log("=============================================================");
              console.log('');
              runSearch();
            }
          });    
  });
}

function sellItem() {
  // prompt for info about the item being put up for auction
  inquirer
    .prompt([
      {
        name: "item",
        type: "input",
        message: "What is the item you would like to sell?"
      },
      {
        name: "deparment",
        type: "input",
        message: "What deparment would you like to place your auction in?"
      },
      {
        name: "price",
        type: "input",
        message: "What would you like your price to be?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
        {
          name: "quantity",
          type:"input",
          message: "How many would you like to sell?",
          validate: function(value) {
            if (isNaN(value) === false) {
              return true;
            }
            return false;
          }
        },
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.item,
          deparment: answer.deparment,
          price: answer.price,
          stock_quantity: answer.quantity,
        },
        function(err) {
          if (err) throw err;
          console.log('');
          console.log("=============================================================");
          console.log("Your auction was created successfully!");
          console.log("=============================================================");
          console.log('');
          // re-prompt the user for if they want to bid or post
          runSearch();
        }
      );
    });
}