import connectMongo from "../../../database/conn";
import { getdemande} from '../../../database/controller'

export default async function handler (req, res) {
    connectMongo().catch(()=>res.status(405).json({error: "Error in the connection"}))

    const {method} = req
    switch (method) {
        case 'GET':
            getdemande(req, res)
            break;

        default:
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
            res.status(405).end(`Method ${method} NOT ALLOWD`)
          break;






    }
}
