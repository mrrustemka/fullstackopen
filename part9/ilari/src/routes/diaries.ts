import express from 'express';
import diaryService from '../services/diaryService';

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
  /* eslint-disable @typescript-eslint/no-unsafe-assignment */
  const { date, weather, visibility, comment } = _req.body;
  const addedEntry = diaryService.addDiary({
    date,
    weather,
    visibility,
    comment
  });
  res.json(addedEntry);
});

export default router;
