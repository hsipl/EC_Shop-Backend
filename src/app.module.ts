import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndexModule } from './module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    // host: 'db',
    host:'localhost',
    port: 3306,
    username: 'root',
    password: 'secret',
    database: 'ec_shop',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    autoLoadEntities: true,
    synchronize: true,
  }), IndexModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
