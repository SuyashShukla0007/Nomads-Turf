
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

router.get("/generate", async (req, res) =>{
   console.log(process.env.API_KEY);
   
    
    try{
        let prompt = `Generate a detailed answer to the following question: "${req.body.input}".  
- Provide relevant links for further reading.  
- Include a concise summary of the answer at the end.`;

    const content = await model.generateContent(prompt);
    res.send(content.response.text());
    }
    catch(err){
        res.json({message: err});
    }
    
}); 

export default router;



