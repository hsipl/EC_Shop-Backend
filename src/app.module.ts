import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IndexModule } from './module';
import { UserMoudle } from './module/user';
import { UserSubscriber } from './service/user_subscriber';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'hsipl206',
    database: 'ec_shop',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    autoLoadEntities: true,
    synchronize: true,
  }), 
  IndexModule,
  UserMoudle,
  UserSubscriber
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
