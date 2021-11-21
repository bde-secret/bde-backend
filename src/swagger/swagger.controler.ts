import { swag, HTTP_METHOD, routeToBeGenerated } from 'src/decorator/swagger.decorator';

export class SwaggerControler {
  public static init() {}

  @swag(HTTP_METHOD.GET, '/swagger', 'Get all route', { authEnabled: false })
  public static getSwagger(req: any, res: any) {
    res.send(routeToBeGenerated);
  }
}
