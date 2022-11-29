import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndexModule} from './module';
import { CarouselModule} from './module/carousel';




@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'secret',
    database: 'ec_shop',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    autoLoadEntities: true,
    synchronize: true,
  }), IndexModule,CarouselModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
