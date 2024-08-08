const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const LeadModel= require('./LeadModel')
const dotenv = require('dotenv')

const app = express();




// Middleware
app.use(cors({
  origin: "https://lead-front.vercel.app", 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
dotenv.config({path:"./.env"})
app.use(bodyParser.json());


// Connect to MongoDB
// const connect = async () => {
//   try {
//  await mongoose.connect(process.env.MONGO_URI);
// console.log("Connected to MongoDB");
// } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
// }
// };
mongoose.connect(process.env.MONGO_URI)
// Define Schema and Model


// Routes
// app.get('/leads', async (req, res) => {
//   const leads = await Lead.find().sort({ name: 1 }); // default sort by name
//   res.json(leads);
// });

app.post('/leads', async (req, res) => {
  const { email, name, number, product } = req.body;
try {
  const newLead = await LeadModel.create({ email, name, number, product });
  res.status(201).json(newLead)
 
} catch (error) {
  console.error("Error during registration:", err);
  res.status(500).json({ error: 'Error during registration' });
}
 
});

app.get('/getleads',(req, res)=>{
      LeadModel.find()
      .then(leads=>res.json(leads))
      .catch(err=>res.json(err))
})

app.get('/getleadsbyid:id', (req, res)=>{
  const id= req.params.id;
  LeadModel.findById({_id:id}).then(
    lead=>res.json((lead))).catch(err=>console.log(err))
})

app.put('/editleads/:id',(req, res)=>{
  const id= req.params.id;
  LeadModel.findByIdAndUpdate({_id:id},{
    email:req.body.email,
    name:req.body.name,
    number:req.body.number,
    product:req.body.product
  }).then(result=> res.json("Success"))
  .catch(err=>res.json(err))
})



app.delete('/deletebyid:id',  (req, res) => {
  const { id } = req.params;
   LeadModel.findByIdAndDelete({_id:id}).then(result=>res.json("lead deleted ")).catch(err=>res.json(err))

});

// Start Server
app.listen(process.env.PORT, () => {
  
  console.log(`Server running on port ${process.env.PORT}`);
});
