import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndexModule } from './module';
import { UserMoudle } from './module/user';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3306,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_SCHEMA,
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    autoLoadEntities: true,
    synchronize: true,
    

  }), 
  IndexModule,
  UserMoudle

],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
