const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");

mongoose
  .connect(
    "mongodb+srv://nimmalanandakishore:Sv55H3Hqp$kFyFJ@cluster0.hqgspsu.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected successfully");
});
const port = 3000;

const pizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  toppings: {
    type: [String],
    required: true,
  },
  avgReview: {
    type: Number,
    required: true,
  },
});
const Pizza = mongoose.model("pizzas", pizzaSchema);
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    const filePath = path.join(__dirname, "public", "index.html");

    fs.readFile(filePath, (err, content) => {
      if (err) {
        // Handle any error while reading the file
        console.error(err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      } else {
        // res.setHeader("Access-Control-Allow-Origin", "*");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content, "utf-8");
      }
    });
  } else if (req.url === "/api/getPizzas" && req.method === "GET") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    Pizza.find()
      .then((pizzas) => {
        console.log(pizzas);
        res.setHeader("Content-Type", "application/json");
        res.statusCode = 200;
        res.end(JSON.stringify(pizzas));
      })
      .catch((error) => {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: "Internal server error" }));
      });
  } else {
    // Handle other requests
    res.statusCode = 404;
    res.end();
  }
});

// Start the server

server.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000");
});

const pizzas = [
  {
    name: "Margherita",
    size: "Medium",
    price: 10.99,
    toppings: ["Tomatoes", "Mozzarella", "Basil"],
    avgReview: 4.5,
  },
  {
    name: "Pepperoni",
    size: "Large",
    price: 14.99,
    toppings: ["Pepperoni", "Mozzarella", "Tomatoes"],
    avgReview: 4.2,
  },
  {
    name: "Vegetarian",
    size: "Small",
    price: 9.99,
    toppings: ["Mushrooms", "Bell Peppers", "Olives", "Onions"],
    avgReview: 4.7,
  },
  {
    name: "BBQ Chicken",
    size: "Large",
    price: 15.99,
    toppings: ["BBQ Sauce", "Grilled Chicken", "Red Onions", "Cilantro"],
    avgReview: 4.1,
  },
];
