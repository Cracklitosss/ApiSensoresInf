import { ISensorDataRepository } from '../domain/ISensorDataRepository';
import { ISensorData } from '../domain/SensorData';
import UserModel from '../domain/User';
import { WebSocketService } from '../infrastructure/services/WebSocketService';

export class CreateSensorData {
    constructor(
        private sensorDataRepository: ISensorDataRepository,
        private webSocketService: WebSocketService
    ) {}

    async execute(sensorData: ISensorData): Promise<ISensorData> {
        try {
            // Buscar el usuario basado en el IdEsp
            const user = await UserModel.findOne({ IdEsp: sensorData.IdEsp });

            if (!user) {
                throw new Error("No user found with this IdEsp");
            }

            const lastSensorData = await this.sensorDataRepository.findLastByUserAndDevice(user._id.toString(), sensorData.IdEsp.toString());

            let resultData: ISensorData | null;
            if (lastSensorData && new Date().getTime() - new Date(lastSensorData.createdAt!).getTime() < 5 * 60 * 1000) {
                resultData = await this.sensorDataRepository.update(lastSensorData._id, sensorData);
            } else {
                resultData = await this.sensorDataRepository.create(sensorData);
                // Actualizar el usuario con los nuevos datos del sensor
                await UserModel.findByIdAndUpdate(user._id, {
                    $push: { sensorData: resultData._id }
                });
            }

            if (!resultData) {
                throw new Error('Failed to create or update sensor data');
            }

            // Enviar datos a través del WebSocket si resultData no es null
            this.webSocketService.sendSensorData(resultData);
            return resultData;
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error('Error creating/updating SensorData: ' + error.message);
            } else {
                throw new Error('Error creating/updating SensorData: An unknown error occurred');
            }
        }
    }
}
