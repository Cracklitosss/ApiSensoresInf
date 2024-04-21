import { Request, Response } from 'express';
import { GetSensorData } from '../../application/GetSensorData';

export class GetSensorDataController {
    constructor(private getSensorDataService: GetSensorData) {}
  
    async handle(req: Request, res: Response): Promise<Response> {
      try {
        const sensorData = await this.getSensorDataService.execute(req.params.id);
        if (!sensorData) {
          return res.status(404).json({ error: 'Sensor data not found' });
        }
        return res.status(200).json(sensorData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          return res.status(400).json({ error: error.message });
        } else {
          return res.status(400).json({ error: 'An unexpected error occurred' });
        }
      }
    }
  }