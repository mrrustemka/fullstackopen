import express from 'express';
import diaryService from '../services/diaryService';
import { toNewDiaryEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
  res.send('Saving a diary!');
});

router.get('/:id', (_req, res) => {
  const diary = diaryService.findById(Number(_req.params.id));

  if (diary) {
    res.send(diary);
  } else {
    res.sendStatus(404);
  }
});

router.post('/', (_req, res) => {
  try {
    const newDiaryEntry = toNewDiaryEntry(_req.body);
    const addedEntry = diaryService.addDiary(newDiaryEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';

    if (error instanceof Error) {
      errorMessage += error.message;
    }

    res.send(400).send(errorMessage);
  }
});

export default router;
