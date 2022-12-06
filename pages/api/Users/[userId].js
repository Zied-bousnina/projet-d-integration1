import connectMongo from "../../../database/conn";
import {deleteUser, getUser, getUsers, postUser, putUser} from '../../../database/controller'

export default async function handler (req, res) {
    connectMongo().catch(()=>res.status(405).json({error: "Error in the connection"}))

    const {method} = req
    switch (method) {
        case 'GET':
            getUser(req, res)
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${method} NOT ALLOWD`)
          break;






    }
}
