import axios from "axios";

export default async function sendWa({ id, nama, bulan, wa }, apiKey, caption) {
    const tahun = new Date().getFullYear();
    const body = {
        to: wa.replace(/^08/, "628"),
        url: `http://localhost:8000/files/${bulan}-${tahun}-${id}.pdf`,
        text: caption,
        filename: `Rekapitulasi ${bulan} ${tahun}_${nama}.pdf`,
    }
    try {
        const response = await axios.post('https://api.chat-wa.com/message/send-document', body, {
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json'
            }
        });
    }catch(error) {
        throw new Error(null);
    }
}