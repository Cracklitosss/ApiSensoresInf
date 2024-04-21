import { ISensorDataRepository } from '../domain/ISensorDataRepository';
import { ISensorData } from '../domain/SensorData';

export class DeleteSensorData {
  constructor(private sensorDataRepository: ISensorDataRepository) {}

  async execute(id: string): Promise<ISensorData | null> {
    return await this.sensorDataRepository.delete(id);
  }
}
