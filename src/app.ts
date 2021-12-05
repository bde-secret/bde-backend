import express from 'express';
import { generateRoute } from '@decorator/swagger.decorator';
import { LoginController } from '@api/login/login.controller';
import { RoleController } from '@api/role/role.controller';
import { SwaggerControler } from '@api/swagger/swagger.controler';

// Create the app
const app = express();
app.use(express.json());

// Init route and generate it
LoginController.init();
RoleController.init();
SwaggerControler.init();
generateRoute(app);

export default app;
