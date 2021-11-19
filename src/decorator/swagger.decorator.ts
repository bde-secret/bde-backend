import { loginService } from 'src/api/login/login.service';

export enum HTTP_METHOD {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
}

interface Route {
  method: HTTP_METHOD;
  route: string;
  description: string;
  execute: any;
  authentificationNeeded: boolean,
}

const routeToBeGenerated: Route[] = [];

export function swagger(method: HTTP_METHOD, route: string, description: string = '', authentificationNeeded: boolean = true) {
  return function(target: object, key: string | symbol, descriptor: PropertyDescriptor) {
    pushRoute(method, route, description, authentificationNeeded, descriptor.value);
    return descriptor;
  };
}

function pushRoute(method: HTTP_METHOD, route: string, description: string, authentificationNeeded: boolean, execute: any) {
  routeToBeGenerated.push({ method, route, description, execute, authentificationNeeded });
}

export function generateRoute(app: any) {
  routeToBeGenerated.forEach(async (routeItem) => {
    const auth = routeItem.authentificationNeeded ? loginService.authenticateToken : loginService.notAuthenticate;

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
}
