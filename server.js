const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Configurações do middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Rota para obter os dados
app.get('/api/avisos', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Erro ao ler dados');
        res.json(JSON.parse(data));
    });
});

// Rota para adicionar um novo aviso
app.post('/api/avisos', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Erro ao ler dados');
        
        const avisos = JSON.parse(data);
        const novoAviso = {
            id: Date.now(),
            docente: req.body.docente,
            sala: req.body.sala,
            horario: req.body.horario
        };
        
        avisos.push(novoAviso);

        fs.writeFile('data.json', JSON.stringify(avisos), (err) => {
            if (err) return res.status(500).send('Erro ao salvar dados');
            res.json(novoAviso);
        });
    });
});

// Rota para editar um aviso
app.put('/api/avisos/:id', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Erro ao ler dados');

        let avisos = JSON.parse(data);
        const avisoId = parseInt(req.params.id);
        const avisoIndex = avisos.findIndex(aviso => aviso.id === avisoId);

        if (avisoIndex === -1) return res.status(404).send('Aviso não encontrado');

        avisos[avisoIndex] = { id: avisoId, ...req.body };

        fs.writeFile('data.json', JSON.stringify(avisos), (err) => {
            if (err) return res.status(500).send('Erro ao salvar dados');
            res.json(avisos[avisoIndex]);
        });
    });
});

// Rota para deletar um aviso
app.delete('/api/avisos/:id', (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) return res.status(500).send('Erro ao ler dados');

        let avisos = JSON.parse(data);
        const avisoId = parseInt(req.params.id);
        avisos = avisos.filter(aviso => aviso.id !== avisoId);

        fs.writeFile('data.json', JSON.stringify(avisos), (err) => {
            if (err) return res.status(500).send('Erro ao salvar dados');
            res.sendStatus(204);
        });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
