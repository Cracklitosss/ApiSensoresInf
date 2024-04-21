import { ISensorDataRepository } from '../../domain/ISensorDataRepository';
import SensorDataModel, { ISensorData } from '../../domain/SensorData';

export class SensorDataRepositoryMongo implements ISensorDataRepository {
  async create(sensorData: ISensorData): Promise<ISensorData> {
    return await SensorDataModel.create(sensorData);
  }

  async findById(id: string): Promise<ISensorData | null> {
    return await SensorDataModel.findById(id);
  }

  async findAll(): Promise<ISensorData[]> {
    return await SensorDataModel.find();
  }

  async update(id: string, sensorData: Partial<ISensorData>): Promise<ISensorData | null> {
    return await SensorDataModel.findByIdAndUpdate(id, sensorData, { new: true });
  }

  async delete(id: string): Promise<ISensorData | null> {
    return await SensorDataModel.findByIdAndDelete(id);
  }
  async findByIdAndPopulate(id: string, path: string): Promise<ISensorData | null> {
    return await SensorDataModel.findById(id).populate(path).exec();
  }

  async findLastByUserAndDevice(userId: string, IdEsp: string): Promise<ISensorData | null> {
    return SensorDataModel.findOne({ userId: userId, IdEsp: IdEsp })
                          .sort({ createdAt: -1 }) // Asegúrate de que exista el índice apropiado
                          .exec();
  }
}
