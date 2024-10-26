const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'public', 'data.json');

module.exports = async (req, res) => {
    if (req.method === 'GET') {
        const data = fs.readFileSync(dataPath, 'utf-8');
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(data);
    } else if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => { body += chunk.toString(); });
        req.on('end', () => {
            const newData = JSON.parse(body);
            const existingData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
            existingData.push(newData);
            fs.writeFileSync(dataPath, JSON.stringify(existingData, null, 2));
            res.status(200).json({ message: 'Aviso adicionado com sucesso!' });
        });
    }
};
