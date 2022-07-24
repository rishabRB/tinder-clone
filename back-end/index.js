const express=require("express")
const app=express()
const PORT=8000
const dotenv = require('dotenv')
const cors=require('cors')
const signupRoute=require('./routes/signup')
const userRoute=require('./routes/users')

dotenv.config();

app.use(express.json())	
app.use(cors())
app.use('/sign', signupRoute)
app.use('/users',userRoute)




app.listen(PORT,()=>console.log('server is running on port '+ PORT))





