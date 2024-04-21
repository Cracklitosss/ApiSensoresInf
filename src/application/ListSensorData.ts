import { ISensorDataRepository } from '../domain/ISensorDataRepository';
import { ISensorData } from '../domain/SensorData';

export class ListSensorData {
  constructor(private sensorDataRepository: ISensorDataRepository) {}

  async execute(): Promise<ISensorData[]> {
    return await this.sensorDataRepository.findAll();
  }
}
