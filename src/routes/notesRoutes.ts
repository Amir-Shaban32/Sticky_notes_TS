import { Router } from 'express';
import { note_index, note_get_create, note_post_create } from '../controllers/controller';

export const router = Router();

router.get('/', note_index);
router.get('/add', note_get_create);
router.post('/', note_post_create);

