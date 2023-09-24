import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      forbidUnknownValues: true,
      disableErrorMessages: process.env.NODE_ENV === 'production'
    })
  );
  const port = 3001;
  await app.listen(port, () => {
    Logger.verbose(
      `Server listening at http://localhost:${port}`,
      'Main'
    );
  });
}
bootstrap();
