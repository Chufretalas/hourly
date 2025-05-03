import { CrudConfigService } from '@dataui/crud';

CrudConfigService.load({
  query: {
    alwaysPaginate: true,
    maxLimit: 1000
  },
  routes: {
    deleteOneBase: {
      returnDeleted: true,
    },
  },
});

import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
