const express = require('express');
const bodyPraser = require('bodyPraser');

const app = express();

app.use(bodyPraser.json());

const user=[];
    app.post('/signup',(req,res)=>{
        const {username, email, password, dob}= req.body;
        if (!username || !email || !password || !dob){
            return res.status(400).json({error:"required details"});
        }
        const userExists = user.find((user) => user.email === email);
        
        if (userExists){
            return res.status(400).json({error: "create a new user"});
        }
        const sampleName = "Abcdef 1234"
        const usersname = sampleName;
        if (!usersname){
            return res.status(400).json({message:"Invalid user format"});
        }
        const samplemail = "xyz@gmail.com"
        const mail = samplemail;
        if (!mail){
            return res.status(400).json({message:"Invalid email format"});
        }
        const samplepass = "Abc@123de"
        const pass = samplepass;
        if (!pass){
            return res.status(400).json({message:"Invalid password format"})
        }

        user.push({username, email, password, dob});
            return res.status(404).json({message:"success"});


    })
    
   

const Port = 3000;
app.listen(PORT,()=>{
    console.log (`Server is running on http://localhost:${PORT}`)
})