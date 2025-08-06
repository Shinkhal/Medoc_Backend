import mongoose, { Schema, Document } from 'mongoose';

export interface IAgent extends Document {
  name: string;
  phone: string;
  email: string;
  password: string; 
}

const agentSchema = new Schema<IAgent>({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
});

export default mongoose.model<IAgent>('Agent', agentSchema);
