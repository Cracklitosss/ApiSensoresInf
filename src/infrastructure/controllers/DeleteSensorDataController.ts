import { Request, Response } from 'express';
import { DeleteSensorData } from '../../application/DeleteSensorData';

export class DeleteSensorDataController {
    constructor(private deleteSensorDataService: DeleteSensorData) {}
  
    async handle(req: Request, res: Response): Promise<Response> {
      try {
        const sensorData = await this.deleteSensorDataService.execute(req.params.id);
        if (!sensorData) {
          return res.status(404).json({ error: 'Sensor data not found' });
        }
        return res.status(204).send();
      } catch (error: unknown) {
        if (error instanceof Error) {
          return res.status(500).json({ error: error.message });
        } else {
          return res.status(500).json({ error: 'An internal server error occurred' });
        }
      }
    }
  }
