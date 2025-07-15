import { Request, Response } from 'express'
import { getDb } from '../models/notes';
import { ObjectId, Document } from 'mongodb';


let db: ReturnType<typeof getDb>;



interface Note extends Document {
  _id?: ObjectId;
  title: string;
  description: string;
}

export const note_index = async (req: Request, res: Response) => {
  db = getDb();
  if (!db) return res.status(500).send('Database is not ready');
  try {
    const notes = db?.collection<Note>('notes');
    const allNotes = await notes?.find().toArray();

    res.render('index', { title: "Sticky notes server", note: allNotes });
  } catch (err) {
    res.status(500).render('404', { title: "Error fetching notes" });
  }
};

export const note_get_create = async (req: Request, res: Response) => {
  res.render('add', { title: "add new note" });
};

export const note_post_create = async (req: Request, res: Response) => {
  const db = getDb();
  if (!db) return res.status(500).send('Database not ready');

  try {
    const new_note = {
      title: req.body.title,
      description: req.body.description,
    };
    await db.collection('notes').insertOne(new_note);

    console.log("Note inserted:", new_note);
    res.redirect('/notes');
  } catch (err) {
    console.error("Error inserting note:", err);
    res.status(500).render('404', { title: 'Error adding note' });
  }
};

