import axios from "axios";
export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { brand } = req.body;
            const response = await axios.post(`${process.env.ENDPOINT_API_9SINGHA}/api/car/models`, { brand });
            res.status(200).json({ data: response.data});
        } catch (error) {
        res.status(error?.status || 500).json({message: error})
        }
        

    } else {
        res.status(405).end();
    }

}
  