import { getXataClient } from '../../utils/xata.codegen'

const handler = async (req, res) => {
    try {
        const xata = getXataClient()

        const records = (await xata?.db?.users.getAll()).filter(
            'email',
            'akinfemi46@gmail.com',
        )
        return res.status(200).json(records)
    } catch (error) {
        console.error(error)
        return res.status(500).send(error)
    }
}
export default handler
