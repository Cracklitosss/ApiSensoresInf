import mongoose, { Document, Schema } from 'mongoose';
import { Types } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  password: string;
  IdEsp: number;
  ocupacion: string;
  estado: string;
  sensorData: mongoose.Types.ObjectId[];
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  IdEsp:{type: Number, default: 0, unique: true },
  ocupacion: { type: String, required: true },
  estado: { type: String, required: true } ,
  sensorData: [{ type: Schema.Types.ObjectId, ref: 'SensorData' }]
});

const UserModel = mongoose.model<IUser>('User', userSchema);

export default UserModel;
