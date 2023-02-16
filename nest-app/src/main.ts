import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import * as hbs from 'hbs';
import { helpers } from "./views/helpers/handlebars-helpers";

bootstrap().then();

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    console.log(join(__dirname, '../dist/static'));

    app.useStaticAssets(join(__dirname, '../dist/static'));
    app.setBaseViewsDir(join(__dirname, 'views'));
    app.set('view options', {layout: 'layouts/layout'});
    hbs.registerPartials(join(__dirname, 'views', 'partials'));
    // @ts-ignore
    Object.keys(helpers).forEach(key => hbs.registerHelper(key, helpers[key]));
    app.setViewEngine('hbs');

    await app.listen(3000);
}

