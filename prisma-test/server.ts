import express from 'express';
import { router } from './src/routes/routes';

const app = express();

app.use(express.json());
app.use(router);

app.get('/', (req, res) => {
    res.send('Hello World!')
  });

app.listen(3333, () => console.log("Está rodando na porta http://localhost:3333"))