import mongoose, { Schema, Document } from 'mongoose';

export interface IHospital extends Document {
  name: string;
  address: string;
}

const hospitalSchema = new Schema<IHospital>({
  name: { type: String, required: true },
  address: { type: String, required: true },
});

export default mongoose.model<IHospital>('Hospital', hospitalSchema);
