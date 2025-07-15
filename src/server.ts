import express, { Request, Response } from 'express';
import path from 'path';
import { router } from './routes/notesRoutes';
import { connectDb } from './models/notes';

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req: Request, res: Response) => {
  res.redirect('/notes');
});

//routes
app.use('/notes', router);


app.use((req: Request, res: Response) => {
  res.status(404).render('404', { title: "404" });
});

connectDb((err: unknown) => {
  if (!err) {
    app.listen(3000, () => console.log('connected to Database on port 3000'));
  }
});

