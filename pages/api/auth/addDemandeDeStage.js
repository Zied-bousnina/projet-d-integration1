import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";
import {hash} from 'bcryptjs'
import Demande from "../../../model/demande";
export default async function handler(req, res)  {
   connectMongo().catch(error=> res.json({error: "Connection Failed...!"}))


   if(req.method ==='POST'){
    if(!req.body) return res.status(404).json({error: "Don't have form data...!"});
//     res.statusCode = 200
//    res.setHeader('Content-Type', 'application/json')

    const {cin, cin2, id_prof, nom, nom2, parcour, prenom, prenom2, id_etud, commentaire, ok} = req.body;
    console.log(req.body.username)


    // check dublicated Users
    const checkexisting = await Demande.findOne({id_etud:id_etud})
    console.log(checkexisting)
    if(checkexisting) return res.status(422).json({message: 'demande Already Exists...!'})

    // hash password
    Demande.create({cin, cin2, id_prof, nom, nom2, parcour, prenom, prenom2, id_etud, commentaire, ok }, function(err, data){
        if(err) return res.status(404).json({err});
        res.status(201).json({status: true, user:data})
    })
   }else {
    res.status(500).json({message: "HTTP method not valid only POST Accepted"})
   }
}