import mongoose, { Document, Schema } from 'mongoose';

export interface ISensorData extends Document {
  userId: mongoose.Types.ObjectId;
  IdEsp: number;
  distancia: number;
  velocidad: number;
  aceleracion: number;
  cantidadPedaleos: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const sensorDataSchema = new mongoose.Schema<ISensorData>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  IdEsp: Number,
  distancia: Number,
  velocidad: Number,
  aceleracion: Number,
  cantidadPedaleos: Number,
}, { timestamps: true });

// Exporta el modelo de Mongoose para SensorData
const SensorDataModel = mongoose.model<ISensorData>('SensorData', sensorDataSchema);
export default SensorDataModel;
