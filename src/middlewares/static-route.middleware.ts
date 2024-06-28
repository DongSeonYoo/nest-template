import { Injectable, NestMiddleware } from '@nestjs/common';
import { join } from 'path';

@Injectable()
export class StaticRouteMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    if (
      req.method === 'GET' &&
      !req.path.startsWith('/api') &&
      req.path !== '/'
    ) {
      const filePath = join(process.cwd(), 'client', `${req.path}.html`);

      return res.sendFile(filePath, (err) => {
        if (err) {
          return res.sendFile(join(process.cwd(), 'client', `404.html`));
        }
      });
    } else {
      return next();
    }
  }
}
