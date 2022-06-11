import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module"
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { ValidationPipe } from "./pipes/validation.pipe";



(async function start() {
    const PORT = process.env.PORT || 5000;

    const app = await NestFactory.create(AppModule)
    app.enableCors();
    const config = new DocumentBuilder()
      .setTitle('TodoList')
      .setDescription('TodoList REST API documentation')
      .setVersion('1.0.0')
      .addTag('TodoList')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);

    app.setGlobalPrefix('api');

    app.useGlobalPipes(new ValidationPipe())


    await app.listen(PORT, () => console.log(`server started on port ${PORT}`))
})()

// heroku logs --tail -a todolist-back-dr
