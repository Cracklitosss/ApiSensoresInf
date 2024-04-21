import { ISensorDataRepository } from '../domain/ISensorDataRepository';
import { ISensorData } from '../domain/SensorData';

export class UpdateSensorData {
  constructor(private sensorDataRepository: ISensorDataRepository) {}

  async execute(id: string, sensorData: Partial<ISensorData>): Promise<ISensorData | null> {
    return await this.sensorDataRepository.update(id, sensorData);
  }
}
