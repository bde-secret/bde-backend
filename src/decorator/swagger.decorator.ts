import { loginService } from 'src/api/login/login.service';

export enum HTTP_METHOD {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
}

interface Option {
  authEnabled: boolean,
}

interface Route {
  method: HTTP_METHOD;
  route: string;
  description: string;
  execute: any;
  options: Option,
}

const routeToBeGenerated: Route[] = [];

export function swag(method: HTTP_METHOD, route: string, description: string = '', options: Option = {
  authEnabled: true,
}) {
  return function(target: object, key: string | symbol, descriptor: PropertyDescriptor) {
    pushRoute(method, route, description, options, descriptor.value);
    return descriptor;
  };
}

function pushRoute(method: HTTP_METHOD, route: string, description: string, options: Option, execute: any) {
  routeToBeGenerated.push({ method, route, description, execute, options });
}

export function generateRoute(app: any) {
  routeToBeGenerated.forEach(async (routeItem) => {
    const auth = routeItem.options.authEnabled ? loginService.authenticateToken : loginService.notAuthenticate;

    console.log(`${routeItem.method.toUpperCase()}: ${routeItem.route} - ${routeItem.description}`);
    switch (routeItem.method) {
    case HTTP_METHOD.GET:
      app.get(routeItem.route, auth, (req: any, res: any) => {
        routeItem.execute(req, res);
      });
      break;
    case HTTP_METHOD.POST:
      app.post(routeItem.route, auth, (req: any, res: any) => {
        routeItem.execute(req, res);
      });
      break;
    case HTTP_METHOD.PUT:
      app.put(routeItem.route, auth, (req: any, res: any) => {
        routeItem.execute(req, res);
      });
      break;
    case HTTP_METHOD.DELETE:
      app.delete(routeItem.route, auth, (req: any, res: any) => {
        routeItem.execute(req, res);
      });
      break;
    default:
      console.log('Unable to find method');
      break;
    }
  });

  // Generate swagger route
  console.log('GET: /swagger - Get all route information');
  app.get('/swagger', (req: any, res: any) => {
    res.send(routeToBeGenerated);
  });
}
