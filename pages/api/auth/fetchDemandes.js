import connectMongo from "../../../database/conn";
import Users from "../../../model/Schema";
import {hash} from 'bcryptjs'
import { getSession, useSession } from "next-auth/react";
import Demande from "../../../model/demande";
export default async function handlerFetchDemande(req, res)  {
    // const {data:session} =  useSession();
   connectMongo().catch(error=> res.json({error: "Connection Failed...!"}));

   if(req.method ==='GET'){
    // const { email} = req.body;


       // check dublicated Users
       const checkexisting = await Demande.find()
       if(checkexisting) return res.json({demande:checkexisting})


    }else {
        res.status(500).json({message: "HTTP method not valid only POST Accepted"})
    }
}