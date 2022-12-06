import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";
import {hash} from 'bcryptjs'
export default async function handler(req, res)  {
   connectMongo().catch(error=> res.json({error: "Connection Failed...!"}))


   if(req.method ==='POST'){
    if(!req.body) return res.status(404).json({error: "Don't have form data...!"});
//     res.statusCode = 200
//    res.setHeader('Content-Type', 'application/json')

    const {username, email, password, cin} = req.body;
    console.log(req.body.username)


    // check dublicated Users
    const checkexisting = await Users.findOne({email})
    if(checkexisting) return res.status(422).json({message: 'User Already Exists...!'})

    // hash password
    Users.create({username, email, cin, password, role:"user"}, function(err, data){
        if(err) return res.status(404).json({err});
        res.status(201).json({status: true, user:data})
    })
   }else {
    res.status(500).json({message: "HTTP method not valid only POST Accepted"})
   }
}