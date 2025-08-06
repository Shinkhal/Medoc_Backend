import { Request, Response } from 'express';
import Sample from '../models/sample';
import Hospital from '../models/hospital';
import Agent from '../models/agent';
import mongoose from 'mongoose';

// Create a new sample
export const createSample = async (req: Request, res: Response) => {
  try {
    const { hospital, agent, patientName, scheduledTime } = req.body;
    if (!hospital || !agent || !patientName || !scheduledTime) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const sample = await Sample.create({
      hospital,
      agent,
      patientName,
      scheduledTime,
    });

    res.status(201).json(sample);
  } catch (error) {
    res.status(500).json({ message: 'Error creating sample', error });
  }
};

// Get all samples
export const getAllSamples = async (_req: Request, res: Response) => {
  try {
    const samples = await Sample.find()
      .populate('hospital', 'name address')
      .populate('agent', 'name email');
    res.status(200).json(samples);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching samples', error });
  }
};

// Get sample by ID
export const getSampleById = async (req: Request, res: Response) => {
  try {
    const sample = await Sample.findById(req.params.id)
      .populate('hospital')
      .populate('agent');

    if (!sample) {
      return res.status(404).json({ message: 'Sample not found' });
    }

    res.status(200).json(sample);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching sample', error });
  }
};

// Update a sample
export const updateSample = async (req: Request, res: Response) => {
  try {
    const updated = await Sample.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Sample not found' });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Error updating sample', error });
  }
};

// Mark sample as collected
export const markSampleCollected = async (req: Request, res: Response) => {
  try {
    const sample = await Sample.findById(req.params.id);
    if (!sample) {
      return res.status(404).json({ message: 'Sample not found' });
    }

    sample.status = 'collected';
    sample.collectedAt = new Date();
    await sample.save();

    res.status(200).json({ message: 'Sample marked as collected', sample });
  } catch (error) {
    res.status(500).json({ message: 'Error marking as collected', error });
  }
};

// Mark sample as delayed
export const markSampleDelayed = async (req: Request, res: Response) => {
  try {
    const sample = await Sample.findById(req.params.id);
    if (!sample) {
      return res.status(404).json({ message: 'Sample not found' });
    }

    sample.status = 'delayed';
    await sample.save();

    res.status(200).json({ message: 'Sample marked as delayed', sample });
  } catch (error) {
    res.status(500).json({ message: 'Error marking as delayed', error });
  }
};
