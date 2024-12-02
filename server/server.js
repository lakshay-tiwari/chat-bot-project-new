require('dotenv').config(); 
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const express = require("express");
const app = express();
const port = 3000 ;
const cors = require('cors');
app.use(cors());
app.use(express.json());


app.post("/",async function(req,res){
  const question = req.body.question ;
  const result = await model.generateContent(question);
  const answer = result.response.text();
  res.json({
    answer
  });
});


app.listen(port);