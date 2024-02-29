const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Stripe = require("stripe");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require("jsonwebtoken");

const uri = "mongodb+srv://agujjar661:qTnonO0nJmtRtIGG@tfa.wlbcmxh.mongodb.net/TFA-DB?retryWrites=true&w=majority";

mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to Mongo Db");
    })
    .catch((err) => {
        console.log("Error connecting to MongoDb", err);
    });

app.listen(port, () => {
    console.log("Server running on port 8000");
});

const Customer = require("./models/Customer");
const Product = require("./models/Products");
const User = require("./models/users");
const CartItem = require("./models/CartItem")
const Order = require("./models/order");
const complaints = require("./models/complaints");
const Table = require("./models/BookTable");
const Feedback = require("./models/Rating");
const Deal = require("./models/Deals")


app.post("/register", (req, res) => {
    const { customername, email, password } = req.body;
    

    // create a new User object
    const newCustomer = new Customer({ customername, email, password });
    //console.log(newUser);
    // save the user to the database
    newCustomer
        .save()
        .then(() => {
            res.status(200).json({ message: "Customer registered successfully" });
        })
        .catch((err) => {
            console.log("Error registering Customer", err);
            res.status(500).json({ message: "Error registering the Customer!" });
        });
});

//function to create a token for the user
const createToken = (customerId) => {
    // Set the token payload
    const payload = {
        customerId: customerId,
    };

    // Generate the token with a secret key and expiration time
    const token = jwt.sign(payload, "Q$r2K6W8n!jCW%Zk", { expiresIn: "1h" });

    return token;
};

//endpoint for logging in of that particular user
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    



    //check for that user in the database
    Customer.findOne({ email })
        .then((customer) => {
            if (!customer) {
                //user not found
                return res.status(404).json({ message: "Customer not found" });
            }

            //compare the provided passwords with the password in the database
            if (customer.password !== password) {
                return res.status(404).json({ message: "Invalid Password!" });
            }

            const token = createToken(customer._id);
            res.status(200).json({ token });
        })
        .catch((error) => {
            console.log("error in finding the Customer", error);
            res.status(500).json({ message: "Internal server Error!" });
        });
});

app.get("/NearbyLocations", async (req, res)=>{
  try{
    const Restaurant = await User.find({});
    //console.log(Restaurant);
    res.status(200).json(Restaurant);
  }
  catch(error){
    console.error("error", error);
    res.status(500).json({message:"internal server"});
  }
})
app.get("/allFood", async (req, res) => {
  const { restaurant_id } = req.query;
  
  
  
  
    try {
      // Find all products and select only 'name' and 'image' fields
      const products = await Product.find({ category: 'Food', mID: restaurant_id })
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching product data", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  app.get("/allTable", async (req, res) => {
    const { restaurant_id } = req.query;
    
  
    try {
      // Find all products and select only 'name' and 'image' fields
      const products = await Product.find({ category: 'Table', mID: restaurant_id })
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching product data", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.get('/table/:id', async (req, res) => {
    const id = req.params.id;
  
    try {
      // Find the record by its _id
      const tableRecord = await Table.findById(id);
  
      if (!tableRecord) {
        return res.status(404).json({ error: 'Table record not found' });
      }
  
      // Sending the table record details as a JSON response
      res.json({ tableRecord });
    } catch (error) {
      console.error('Error fetching table record:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  app.post('/AutomatedTableBook', async (req, res) => {
    const { tableType,capacity, duration, startTime, endTime } = req.body;
    
  
    if (!tableType || !capacity || !duration || !startTime || !endTime) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
    try {
      // Find all products and select only 'name' and 'image' fields
      const products = await Product.findOne({ brand: tableType, capacity: capacity})
      
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching Table data", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })

  app.post('/checkavailable', async (req, res) => {
    const { tableId,date, startTime, endTime } = req.body;
  
    if (!tableId || !startTime ||!date || !endTime) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
  
    try {
      // Search for all documents with the specified tableId in the database
      const tables = await Table.find({ tableId });
  
      if (!tables || tables.length === 0) {
        return res.json({ message: 'Tables not found for the given tableId' });
      }
  
      let isTableBooked = false;
  
      for (const table of tables) {
            if (table.startTime == startTime && table.endTime == endTime && table.date == date) {
              isTableBooked = true;
              
              break;
        }
      }
  
      if (isTableBooked) {
        return res.json({ message: 'This table is already booked for the specified time' });
      } else {
        return res.json({ message: 'Table is available for booking' });
      }
    } catch (error) {
      console.error('Error comparing date and time:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  
  
  
  app.get("/allRestaurants", async (req, res) => {
    try {
      // Find all products and select only 'name' and 'image' fields
      const Users = await User.find({});
  
      res.status(200).json(Users);
    } catch (error) {
      console.error("Error fetching Restaurant data", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.get("/allDeals", async (req, res) => {
    try {
      // Find all products and select only 'name' and 'image' fields
      const Deals = await Deal.find({});
  
      res.status(200).json(Deals);
      // console.log(Deals);
    } catch (error) {
      console.error("Error fetching Restaurant data", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  app.post('/addtocart', async (req, res) => {
    try {
      const { userId, managerId, items } = req.body;
      //console.log(userId);
  
      //const userIdObjectId = mongoose.Types.ObjectId(userId);

      const newCartItem = new CartItem({
        userId,
        mId: managerId,
        items,
      });
  
      // Save the cart item to the database
      await newCartItem.save();
  
      res.status(201).json({ message: 'Item added to the cart successfully', cartItem: newCartItem });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  // Define a route to fetch cart items by user ID
app.get('/getitemsuser/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
   // console.log(userId);

    // Fetch cart items based on the user ID from your database
    const cartItems = await CartItem.find({ userId });

    res.status(200).json(cartItems);
  } catch (error) {
    console.error('Error fetching cart items', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/getuserdetails/:id', async (req, res) => {
  try {
    const { id: loggedUserId } = req.params;
    // console.log(req.params);

    const userDetails = await Customer.findById(loggedUserId );
    if(!userDetails){
      console.log("not found")
    }
    // else(
    //   
    // )
    res.status(200).json(userDetails);
    
  } catch (error) {
    console.error('Error fetching orders', error);
    res.status(500).json({ message: 'Internal error' });
  }
});
app.get('/getorders/:id', async (req, res) => {
  try {
    const { id: loggedUserId } = req.params;
    

    const userOrders = await Order.find({ userId: loggedUserId });
    

    res.status(200).json(userOrders);
    
  } catch (error) {
    console.error('Error fetching orders', error);
    res.status(500).json({ message: 'Internal error' });
  }
});

app.post('/createorder', async (req, res) => {
  try {
    const orderData = req.body;

    // Create a new order based on the order schema
    const newOrder = new Order(orderData);

    // Save the order to the database
    await newOrder.save();
    await CartItem.deleteMany({ userId: orderData.userId });

    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/booktable', async (req, res) => {
  try {
    const BookTable = req.body;
    

    // Create a new order based on the order schema
    const newTable = new Table(BookTable);

    // Save the order to the database
    await newTable.save();

    res.status(201).json({ message: 'Table Booked successfully', tableId: newTable._id });
  } catch (error) {
    console.error('Error Booking table:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/postfeedback', async (req, res) => {
  
    const{ userId, mID, rating, feedback } = req.body;
    
    try {

    // Create a new order based on the order schema
    const newFeedback = new Feedback({
      userId,
      mID,
      rating, 
      feedback,
    });

    await newFeedback.save();

    const feedbacks = await Feedback.find({ mID });
    const totalRating = feedbacks.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / feedbacks.length;
    const roundedRating = averageRating.toFixed(1);

    
    await User.updateOne({ _id: mID }, { $set: { rating: roundedRating } });


    res.status(201).json({ message: 'Thanks for your Feedback' });
  } catch (error) {
    console.error('Error occurs:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
 
app.post('/complaints', async (req, res) => {
  const { userId, name, email, complaint, chatDate } = req.body;
  

  try {
    // Parse chatDate string to create a Date object
    const chatDateObj = new Date(chatDate);

    const newComplaint = new complaints({
      userId,
      name,
      email,
      complaint,
      chatDate: chatDateObj, // Store chatDate as a Date object
    });

    await newComplaint.save();

    res.status(201).json({ message: 'Complaint stored successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while storing the complaint' });
  }
});

const stripe =Stripe('sk_test_51OHJcEAdQ3Xt2cB7aKrCVKeqscJHr9goW7Z3QzNqO1JhGDIgKx1XrBE9hvXmCCUtmnEn8kDhAT5zMyUcnhAzksrQ005idPEffI')

app.post('/stripe/pay',async (req, res) => {
  try {
    const { customerName } = req.body;

    if (!customerName)
      return res.status(400).json({ message: "Please enter a name" });
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000 * 100,
      currency: "pkr",
      payment_method_types: ["card"],
      metadata: {
        name: customerName,
        
      },
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({ message: "Payment initiated", clientSecret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});





app.post(`/webhook/stripe`,async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;
  try {
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      'sk_test_51OHJcEAdQ3Xt2cB7aKrCVKeqscJHr9goW7Z3QzNqO1JhGDIgKx1XrBE9hvXmCCUtmnEn8kDhAT5zMyUcnhAzksrQ005idPEffI '   );

    switch (event.type) {
      case "charge.succeeded":
        console.log('payment suceeded');

        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
        break;
    }
  } catch (err) {
    console.error(err);
  }

  // Event when a payment is initiated
  if (event?.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.name} initated payment!`);
  }
  // Event when a payment is succeeded
  if (event?.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.name} succeeded payment!`);
    //Yahan par data dalna hai

    // fulfilment
  }
  res.json({ ok: true });
});