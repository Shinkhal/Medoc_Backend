import mongoose, { Schema, Document } from 'mongoose';

export interface ISample extends Document {
  hospital: mongoose.Schema.Types.ObjectId;
  agent: mongoose.Schema.Types.ObjectId;
  patientName: string;
  status: 'pending' | 'collected'| 'delayed';
  scheduledTime: Date;
  collectedAt?: Date;
}

const sampleSchema = new Schema<ISample>({
  hospital: { type: Schema.Types.ObjectId, ref: 'Hospital', required: true },
  agent: { type: Schema.Types.ObjectId, ref: 'Agent', required: true },
  patientName: { type: String, required: true },
  status: { type: String, enum: ['pending', 'collected','delayed'], default: 'pending' },
  scheduledTime: { type: Date, required: true },
  collectedAt: { type: Date },
});

export default mongoose.model<ISample>('Sample', sampleSchema);
