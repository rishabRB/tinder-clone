const router = require('express').Router()
const {MongoClient} = require('mongodb')
const {v4:uuidv4} = require('uuid')
const bcrypt = require('bcrypt')
const jwt= require('jsonwebtoken')




//signup

router.post('/signup',async(req,res)=>{
	const client = new MongoClient(process.env.MONOG_URI)
	const {Email,password } = req.body
	const genrateUserId = uuidv4()
	const hashedPassword = await bcrypt.hash(password,10)

	try{
	  await client.connect()
	  const database = client.db('app-data')
	  const users = database.collection('users')
	
		const existingUser = await users.findOne({email:Email})

	  if(existingUser){
	    return res.status(409).send('User already exits!Please Log in ')
	  }

	  const sensitiveEmail=Email.toLowerCase()
	  const data ={
	   user_id:genrateUserId,
	   email:sensitiveEmail,
	   hashed_password:hashedPassword,
	  }
	 
		const InsertUser=await users.insertOne(data)
        const token = jwt.sign(InsertUser,sensitiveEmail,{
			expiresIn:68*24,
		})

		res.status(201).json({AuthToken:token,userId:genrateUserId,Email:sensitiveEmail})
	}
	catch(err)
	{
		console.log(err)
	}
	finally{
		await client.close()
	}

 
})

//create account
router.put('/onboarding',async(req,res)=>{

	const client= new MongoClient(process.env.MONOG_URI)
	const formData = req.body.formData
   
	
	try{
		await client.connect()
		const database=client.db('app-data') 
		const users=database.collection('users')
		const query={user_id:formData.user_id}
		const updateDocument={
			$set:{
				first_name:formData.first_name,
				dob_day:formData.dob_day,
				dob_month:formData.dob_month,
				dob_year:formData.dob_year,
				gender_identity:formData.gender_identity,
				gender_interest:formData.gender_interest,
				show_gender:formData.show_gender,
				url:formData.url,
				about:formData.about,
				matches:formData.matches
			}
		}
		const User=await users.updateOne(query,updateDocument)
		
        User && res.json(User)

	}
	finally{
		await client.close()
	}
})


//login

router.post('/login',async(req,res)=>{
	  const client = new MongoClient(process.env.MONOG_URI)
	  const { Email,password } = req.body
	  try{
	   await client.connect()
	   const database = client.db('app-data')
	   const Users=database.collection('users')
	   
		  const user=await Users.findOne({email:Email})

		  if(user){
		  const correctPassword= await bcrypt.compare(password,user.hashed_password)
			  if(user && correctPassword){
				const token = jwt.sign(user,Email,{
					expiresIn:68*24,
				})
				res.status(201).json({AuthToken:token,userId:user.user_id,Email})
			  }
			}
			else{
			res.status(400).send('Invalid credentials')
			}

		
	  }
	  catch(err){
	    console.log(err) 
	  }
	  finally{
		  await client.close()
	  }
})


module.exports=router
