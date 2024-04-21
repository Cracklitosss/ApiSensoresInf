import { Request, Response } from 'express';
import { CreateSensorData } from '../../application/CreateSensorData';

export class CreateSensorDataController {
  constructor(private createSensorDataService: CreateSensorData) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const sensorData = await this.createSensorDataService.execute(req.body);
      return res.status(201).json(sensorData);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(400).json({ error: 'An unexpected error occurred' });
      }
    }
  }
}