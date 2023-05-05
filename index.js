const express = require("express");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");

// ----------------- imported file -----------------------
const dbConnect = require("./utilits/dbConnect");
const toolsRoute = require("./routes/v1/tools.route"); // we can rewrite this import name
const viewCount = require("./middleware/viewCount");
let ejs = require('ejs');
const errorHandler = require("./middleware/errorHandler");
/* we can also use limiter for whole project in the index.js file */
// const limiter = require("./middleware/limiter");



// type of middleware // 5 types of middleware exist 
app.use(cors());
app.use(express.json()); //types of middleware = build in middlrware //app.use(express.text())


app.use(express.static("public")) // this will allow me write file name in browser to get acces the file vlaue
app.set("views engine", "ejs") // wer can redner html file in the client side     

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/img.jpg")
  console.log("file send");
})

app.get('/ejs', (req, res) => {
  res.render("home.ejs", {
    id: 4,
    user: {
      name: "test"
    }

  })
})

// dbConnect();

// app.use(viewCount) // it also can be used in the index file or can create a new file to use it



/*  limiter is for user limit of trying the browser for logining and developer can control this limit using this "third pary middleware" */
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// })

// app.use(limiter)


// app.use('/tools', toolsRoute)
app.use('/api/v1/tools', toolsRoute)






async function run() {
  try {
    // await client.connect();

    // const toolsCollection = client.db("toolsManufacturer").collection("tools");
    // const orderCollection = client.db("toolsManufacturer").collection("orders");
    // const reviewCollection = client.db("toolsManufacturer").collection("reviews");
    // const userCollection = client.db("toolsManufacturer").collection("users");
    // const profileCollection = client.db("toolsManufacturer").collection("profile");
    // const paymentCollection = client.db("toolsManufacturer").collection("payments");


    // // tools api 
    // app.get("/tools", async (req, res) => {
    //   const query = {};
    //   const result = await toolsCollection.find(query).toArray();
    //   res.send(result);
    // });

    // app.post("/tools", async (req, res) => {
    //   const tools = req.body;
    //   const result = await toolsCollection.insertOne(tools);
    //   res.send(result);
    // });

    // app.get("/tools/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await toolsCollection.findOne(query);
    //   res.send(result);
    // });
    // app.delete("/tools/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await toolsCollection.deleteOne(query);
    //   res.send(result);
    // });


    // // orders api 
    // app.post("/orders", async (req, res) => {
    //   const orders = req.body;
    //   const result = await orderCollection.insertOne(orders);
    //   console.log(orders);
    //   sendOrderMail(orders);
    //   res.send(result);
    // });
    // app.get("/orders", async (req, res) => {
    //   const email = req.query.email;
    //   if (email) {
    //     const query = { email: email };
    //     const cursor = orderCollection.find(query);
    //     const result = await cursor.toArray();
    //     res.send(result);
    //   }
    //   else {
    //     const query = {};
    //     const result = await orderCollection.find(query).toArray();
    //     res.send(result);
    //   }
    // });

    // app.get("/orders/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await orderCollection.findOne(query);
    //   res.send(result);
    // });
    // app.delete("/orders/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await orderCollection.deleteOne(query);
    //   res.send(result);
    // });

    // app.patch("/orders/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const payment = req.body;
    //   const filter = { _id: ObjectId(id) };
    //   const updatedDoc = {
    //     $set: {
    //       paid: true,
    //       transactionId: payment.transactionId
    //     }
    //   };
    //   adf;
    //   const result = await paymentCollection.insertOne(payment);
    //   const updateOrder = await orderCollection.updateOne(filter, updatedDoc);
    //   res.send(updateOrder);
    // });

    // app.post("/create-payment-intent", async (req, res) => {
    //   const service = req.body;
    //   const price = service.total;
    //   const amount = price * 100;
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: amount,
    //     currency: "usd",
    //     payment_method_types: ["card"]
    //   });
    //   res.send({ clientSecret: paymentIntent.client_secret });
    // });

    // // review api
    // app.post("/review", async (req, res) => {
    //   const review = req.body;
    //   const result = await reviewCollection.insertOne(review);
    //   res.send(result);
    // });
    // app.get("/review", async (req, res) => {
    //   const query = {};
    //   const result = await reviewCollection.find(query).toArray();
    //   res.send(result);
    // });


    // //user api
    // app.get("/user", async (req, res) => {
    //   const allUser = await userCollection.find().toArray();
    //   res.send(allUser);
    // });

    // app.delete("/user/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const query = { _id: ObjectId(id) };
    //   const result = await userCollection.deleteOne(query);
    //   res.send(result);
    // });


    // app.put("/user/admin/:email", async (req, res) => {
    //   const email = req.params.email;
    //   const filter = { email: email };
    //   const updateDoc = {
    //     $set: { role: "admin" },
    //   };
    //   const result = await userCollection.updateOne(filter, updateDoc);
    //   res.send(result);
    // });

    // app.get("/admin/:email", async (req, res) => {
    //   const email = req.params.email;
    //   const user = await userCollection.findOne({ email: email });
    //   const isAdmin = user.role === "admin";
    //   res.send({ admin: isAdmin });
    // });

    // app.put("/user/:email", async (req, res) => {
    //   const email = req.params.email;
    //   const user = req.body;
    //   const filter = { email: email };
    //   const options = { upsert: true };
    //   const updateDoc = {
    //     $set: user,
    //   };
    //   const result = await userCollection.updateOne(filter, updateDoc, options);
    //   const token = jwt.sign({ email: email }, process.env.ACCESS_SECRET_TOKEN, { expiresIn: "2h" });
    //   res.send({ result, token });
    // });

    // //profile api
    // app.post("/profile", async (req, res) => {
    //   const profile = req.body;
    //   const result = await profileCollection.insertOne(profile);
    //   res.send(result);
    // });
    // app.get("/profile", async (req, res) => {
    //   const email = req.query.email;
    //   const query = { email: email };
    //   const cursor = profileCollection.find(query);
    //   const result = await cursor.toArray();
    //   res.send(result);
    // });
  }
  finally {

  }
}
run().catch(console.dir);


app.get("/", (req, res) => {
  res.send("Hello World");
});


/* 0--------------- if any route hitted in the client but that route note exist then we show this response to the client side  */
app.all("*", (req, res) => {
  res.send("No Route found!!!!!!!!")
})


app.use(errorHandler)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});


process.on("unhandledRejection", (error) => {
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1)
  })
})