import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carousel } from 'src/entity/carousel.entity';
import { CarouselController } from 'src/controller/carousel';
import { CarouselService } from 'src/service/carousel';
import { StorageService } from "src/service/storage_service";



@Module({
    imports: [TypeOrmModule.forFeature([Carousel])],
    controllers: [CarouselController],
    providers: [CarouselService,StorageService],
    exports: [TypeOrmModule]
})

export class CarouselModule { }