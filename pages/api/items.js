import fs from 'fs';
import path from 'path';

const DATA_FILE = path.resolve('data.json');

function readData() {
    try {
        if (!fs.existsSync(DATA_FILE)) {
            fs.writeFileSync(DATA_FILE, JSON.stringify({ items: [], todos: [] }, null, 2));
            return { items: [], todos: [] };
        }
        const raw = fs.readFileSync(DATA_FILE, 'utf8');
        return JSON.parse(raw || '{"items":[],"todos":[]}');
    } catch (err) {
        console.error('readData error', err);
        return { items: [], todos: [] };
    }
}

function writeData(data) {
    try {
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (err) {
        console.error('writeData error', err);
        return false;
    }
}

export default async function handler(req, res) {
    const storageKey = req.query.key;
    if (!storageKey || !['items', 'todos'].includes(storageKey)) {
        return res.status(400).json({ error: 'missing or invalid key' });
    }

    if (req.method === 'GET') {
        const data = readData();
        return res.status(200).json(data[storageKey] || []);
    }

    if (req.method === 'POST') {
        const body = req.body;
        if (!Array.isArray(body)) {
            return res.status(400).json({ error: 'expected array' });
        }
        const current = readData();
        current[storageKey] = body;
        const ok = writeData(current);
        if (!ok) return res.status(500).json({ error: 'failed to write file' });
        return res.status(200).json({ ok: true });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
}
