export enum HTTP_METHOD {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PUT = 'put',
};

interface Route {
  method: HTTP_METHOD,
  route: string,
  description: string,
  execute: any,
};

const routeToBeGenerated: Route[] = [];

export function swagger(method: HTTP_METHOD, route: string, description: string = '') {
  return function(target: object, key: string | symbol, descriptor: PropertyDescriptor) {
    pushRoute(method, route, description, descriptor.value);
    return descriptor;
  };
};

function pushRoute(method: HTTP_METHOD, route: string, description: string, execute: any) {
  routeToBeGenerated.push({ method, route, description, execute });
}

export function generateRoute(app: any) {
  routeToBeGenerated.forEach((route) => {
    console.log(`${route.method.toUpperCase()}: ${route.route} - ${route.description}`);
    switch (route.method) {
    case HTTP_METHOD.GET:
      app.get(route, (req: any, res: any) => {
        route.execute(req, res);
      });
      break;
    case HTTP_METHOD.POST:
      app.post(route, (req: any, res: any) => {
        route.execute(req, res);
      });
      break;
    case HTTP_METHOD.PUT:
      app.put(route, (req: any, res: any) => {
        route.execute(req, res);
      });
      break;
    case HTTP_METHOD.DELETE:
      app.delete(route, (req: any, res: any) => {
        route.execute(req, res);
      });
      break;
    default:
      console.log('Unable to find method');
      break;
    }
  });
};
