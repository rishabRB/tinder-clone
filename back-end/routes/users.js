const router = require('express').Router()
const {MongoClient} = require('mongodb')
// const {v4:uuidv4} = require('uuid')
// const bcrypt = require('bcrypt')
// const jwt= require('jsonwebtoken')



//getting multiple user
router.get('/alluser',async(req,res)=>{
const client = new MongoClient(process.env.MONOG_URI)
const userIds = JSON.parse(req.query.userIds)
console.log(userIds)
	try{
	  await client.connect()
	  const database = client.db('app-data')
	  const user = database.collection('users')

	  const pipeline = [
		{
			'$match':{
				'user_id':{
					'$in':userIds
				}
			}
		}
	  ]
	  	const foundUsers = await user.aggregate(pipeline).toArray()
		console.log(foundUsers)
		res.send(foundUsers)

	 }
	   finally{
		   await client.close()
	   }
})


//getting single user
router.get('/user',async(req,res)=>{
const client = new MongoClient(process.env.MONOG_URI)
const userId=req.query.userId
	
	try{
		await client.connect()
		const database=client.db('app-data')
		const users=database.collection('users')

		const query={user_id:userId}
        const user=await users.findOne(query)
		res.send(user)
	}
	catch(err){
	console.log(err)
	}
	finally{
		await client.close()
	}
})	


//get gender user

router.get('/gendered_user',async(req,res)=>{
	const client=new MongoClient(process.env.MONOG_URI)
	const gender = req.query.gender

	try{
		await client.connect()
		const database = client.db('app-data')
		const users= database.collection('users')
		const query = {gender_identity:{$eq:gender}}

		const returnedUser = await users.find(query).toArray()

		res.status(200).send(returnedUser)
	}

	catch(error){
		console.log(error)
	}
	finally{
		await client.close()
	}
})


//adding match to user

router.put('/addmatch',async(req,res)=>{
	const client = new MongoClient(process.env.MONOG_URI)
	const {userId,matchUserId} = req.body

	try{
		await client.connect()
		const database=client.db('app-data')
		const user=database.collection('users')

		const query={user_id:userId}
		const updateDocumment={
			$push:{
				matches:{user_id:matchUserId}
			}
		}

		const updateUser=await user.updateOne(query,updateDocumment)
		res.status(201).send(updateUser)
		
	}
	catch(err){
		console.log(err)
	}
	finally{
		await client.close()
	}
})


//getting user message

router.get('/messages',async(req,res)=>{
	const client = new MongoClient(process.env.MONOG_URI)
	const {userId,crosspondingUserId} = req.query
	try{
		await client.connect()
		const database=client.db('app-data')
		const message=database.collection('messages')

		const query={
			from_userId:userId , to_userId:crosspondingUserId
		}

		const foundMessages = await message.find(query).toArray()
		res.send(foundMessages)
	}
	catch(err){
		console.log(err)
	}
	finally{
		await client.close()
	}

})


//adding message to database

router.post('/message',async(req,res)=>{
	const client = new MongoClient(process.env.MONOG_URI)
    const {from_userId,to_userId,timestamp,message} = req.body
	

	try{
		await client.connect()
		const database = client.db('app-data')
		const messages = database.collection('messages')

		const messageDocument={
		  	from_userId,
			to_userId,
			message,
			timestamp
		}

		const insterderMessage = await messages.insertOne(messageDocument)
		res.send(insterderMessage)
	}
	catch(err){
		console.log(err)
	}
	finally{
		await client.close()
	}
	
})


module.exports=router



