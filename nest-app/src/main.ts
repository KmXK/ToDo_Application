import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
// @ts-ignore
import * as hbs from 'hbs';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    console.log(join(__dirname, '../dist/static'));

    app.useStaticAssets(join(__dirname, '../dist/static'));
    app.setBaseViewsDir(join(__dirname, 'views'));
    app.set('view options', {layout: 'layouts/layout'});
    (require('hbs-utils')(hbs)).registerWatchedPartials(join(__dirname, 'views/partials'));
    app.setViewEngine('hbs');

    await app.listen(3000);
}

bootstrap().then();
