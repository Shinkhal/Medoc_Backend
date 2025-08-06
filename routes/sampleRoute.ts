import express from 'express';
import {
  createSample,
  getAllSamples,
  getSampleById,
  updateSample,
  markSampleCollected,
  markSampleDelayed,
} from '../controllers/sampleController';

const router = express.Router();

router.post('/create', createSample);
router.get('/all', getAllSamples);
router.get('/:id', getSampleById);
router.put('/:id', updateSample);
router.patch('/:id/collect', markSampleCollected);
router.patch('/:id/delay', markSampleDelayed);

export default router;
