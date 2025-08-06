import express from 'express';
import {
  createSample,
  getAllSamples,
  getSampleById,
  updateSample,
  markSampleCollected,
  markSampleDelayed,
} from '../controllers/sampleController';
import { protect } from '../middlewares/authMiddleware';
import { hospitalProtect } from '../middlewares/hospitalMiddleware';

const router = express.Router();

router.post('/create',hospitalProtect, createSample);
router.get('/all',  getAllSamples);
router.get('/:id',  getSampleById);
router.put('/:id',hospitalProtect, updateSample);
router.patch('/:id/collect',protect, markSampleCollected);
router.patch('/:id/delay',protect, markSampleDelayed);

export default router;
