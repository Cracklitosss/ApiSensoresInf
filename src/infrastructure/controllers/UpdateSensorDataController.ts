import { Request, Response } from 'express';
import { UpdateSensorData } from '../../application/UpdateSensorData';

export class UpdateSensorDataController {
    constructor(private updateSensorDataService: UpdateSensorData) {}
  
    async handle(req: Request, res: Response): Promise<Response> {
      try {
        const updatedSensorData = await this.updateSensorDataService.execute(req.params.id, req.body);
        if (!updatedSensorData) {
          return res.status(404).json({ error: 'Sensor data not found' });
        }
        return res.status(200).json(updatedSensorData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          return res.status(400).json({ error: error.message });
        } else {
          return res.status(400).json({ error: 'An unexpected error occurred' });
        }
      }
    }
  }
