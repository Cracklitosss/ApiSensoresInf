import { Request, Response } from 'express';
import { ListSensorData } from '../../application/ListSensorData';

export class ListSensorDataController {
    constructor(private listSensorDataService: ListSensorData) {}
  
    async handle(req: Request, res: Response): Promise<Response> {
      try {
        const sensorData = await this.listSensorDataService.execute();
        return res.status(200).json(sensorData);
      } catch (error: unknown) {
        if (error instanceof Error) {
          return res.status(500).json({ error: error.message });
        } else {
          return res.status(500).json({ error: 'An internal server error occurred' });
        }
      }
    }
  }