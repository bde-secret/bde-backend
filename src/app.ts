import express from 'express';
import { generateRoute } from './decorator/swagger.decorator';
import { LoginController } from './api/login/login.controller';

// Create the app
const app = express();
app.use(express.json());

// Init route and generate it
LoginController.init();
generateRoute(app);

export default app;
