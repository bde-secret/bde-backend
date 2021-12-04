import { loginService } from '@api/login/login.service';
import { CONSOLE_COLOR, Logger } from '@logger/logger';

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

export const routeToBeGenerated: Route[] = [];

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

function generateLoggerMessage(route: Route) {
  Logger.custom(CONSOLE_COLOR.BgGreen, [
    {
      messgae: route.method.toUpperCase(),
      color: [CONSOLE_COLOR.BgBlue, CONSOLE_COLOR.FgWhite, CONSOLE_COLOR.Bright],
    },
    {
      messgae: ` ${route.route} - ${route.description}`,
    },
  ]);
}

export function generateRoute(app: any) {
  routeToBeGenerated.forEach(async (routeItem) => {
    const auth = routeItem.options.authEnabled ? loginService.authenticateToken : loginService.notAuthenticate;
    generateLoggerMessage(routeItem);
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
      Logger.error('Unable to find method');
      break;
    }
  });
}
