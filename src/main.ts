import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  process.env.TZ = '-03:00';

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove props não-declaradas no DTO
      forbidNonWhitelisted: false, // true para lançar erro em vez de apenas remover
      transform: true, // transforma payload para instância do DTO
    }),
  );

  app.enableCors();

  await app.listen(process.env.PORT ?? 4000);
}
void bootstrap();
