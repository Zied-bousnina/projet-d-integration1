import connectMongo from "../../../database/conn";
import {deleteUser, getUsers, postUser, putUser} from '../../../database/controller'


export default async function handler (req, res) {
    connectMongo().catch(()=>res.status(405).json({error: "Error in the connection"}))


    //type of request
    // ['get', Post, put, delete]

    const {method} = req
    switch (method) {
        case 'GET':
            getUsers(req, res)
            break;

        case "POST":
            postUser(req, res)
            // res.status(200).json({method, name:"POST Request"});
            break;

        case "PUT":
            putUser(req, res)
            // res.status(200).json({method, name:"PUT Request"});
            break;

        case "DELETE":
            deleteUser(req, res)
        // res.status(200).json({method, name:"DELETE Request"});
          break;


        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${method} NOT ALLOWD`)
          break;






    }

    // res.status(200).json({name: "zied bousnina"})
}