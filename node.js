const express = require('express');
const fs = require('fs').promises;
const app = express();
const PORT = 3000;

const DATA_FILE = './data/students.json';

app.use(express.json());
app.use(express.static('public'));

app.get('/students', async (req, res) => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        res.json(JSON.parse(data));
    } catch {
        res.json([]);
    }
});

app.post('/students', async (req, res) => {
    try {
        const students = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8') || '[]');
        students.push(req.body);
        await fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2));
        res.status(201).send();
    } catch {
        res.status(500).send();
    }
});

app.delete('/students/:index', async (req, res) => {
    try {
        const index = parseInt(req.params.index);
        const students = JSON.parse(await fs.readFile(DATA_FILE, 'utf-8') || '[]');
        students.splice(index, 1);
        await fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2));
        res.status(204).send();
    } catch {
        res.status(500).send();
    }
});

app.listen(PORT, () => console.log(`Сервер запущено на http://localhost:${PORT}`));
