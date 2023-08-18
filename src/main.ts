import { NestFactory } from "@nestjs/core";
import { AppModule } from "./Model/app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  await app.listen(3000);
}
bootstrap();
