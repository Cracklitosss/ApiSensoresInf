import express from 'express';
import { CreateSensorDataController } from '../controllers/CreateSensorDataController';
import { GetSensorDataController } from '../controllers/GetSensorDataController';
import { UpdateSensorDataController } from '../controllers/UpdateSensorDataController';
import { DeleteSensorDataController } from '../controllers/DeleteSensorDataController';
import { ListSensorDataController } from '../controllers/ListSensorDataController';
import { CreateSensorData } from '../../application/CreateSensorData';
import { GetSensorData } from '../../application/GetSensorData';
import { UpdateSensorData } from '../../application/UpdateSensorData';
import { DeleteSensorData } from '../../application/DeleteSensorData';
import { ListSensorData } from '../../application/ListSensorData';
import { SensorDataRepositoryMongo } from '../repository/SensorDataRepositoryMongo';
import { WebSocketService } from '../services/WebSocketService';

// Crear instancias de los servicios y controladores
const sensorDataRepository = new SensorDataRepositoryMongo();
const webSocketService = new WebSocketService(); 
const createSensorData = new CreateSensorData(sensorDataRepository, webSocketService);
const getSensorData = new GetSensorData(sensorDataRepository);
const updateSensorData = new UpdateSensorData(sensorDataRepository);
const deleteSensorData = new DeleteSensorData(sensorDataRepository);
const listSensorData = new ListSensorData(sensorDataRepository);

const createSensorDataController = new CreateSensorDataController(createSensorData);
const getSensorDataController = new GetSensorDataController(getSensorData);
const updateSensorDataController = new UpdateSensorDataController(updateSensorData);
const deleteSensorDataController = new DeleteSensorDataController(deleteSensorData);
const listSensorDataController = new ListSensorDataController(listSensorData);

// Configurar el router de Express
const router = express.Router();

// Definir rutas para operaciones CRUD
router.post('/sensordata', (req, res) => createSensorDataController.handle(req, res));
router.get('/sensordata/:id', (req, res) => getSensorDataController.handle(req, res));
router.put('/sensordata/:id', (req, res) => updateSensorDataController.handle(req, res));
router.delete('/sensordata/:id', (req, res) => deleteSensorDataController.handle(req, res));
router.get('/sensordata', (req, res) => listSensorDataController.handle(req, res));

export default router;
