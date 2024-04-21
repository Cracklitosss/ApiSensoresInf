import { ISensorData } from './SensorData';

export interface ISensorDataRepository {
    create(sensorData: ISensorData): Promise<ISensorData>;
    findById(id: string): Promise<ISensorData | null>;
    findAll(): Promise<ISensorData[]>;
    update(id: string, sensorData: Partial<ISensorData>): Promise<ISensorData | null>;
    delete(id: string): Promise<ISensorData | null>;
    findLastByUserAndDevice(userId: string, IdEsp: string): Promise<ISensorData | null>;
}
