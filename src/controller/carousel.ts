import {
  Controller, Get, Post, NotFoundException, ServiceUnavailableException, Res,
  HttpStatus, Body, Param, Put, UseInterceptors, UploadedFile, Patch, Request
} from '@nestjs/common';
import { CarouselService } from 'src/service/carousel';
import { CreateCarouselDto} from 'src/dto/carousel';

import { FileInterceptor } from '@nestjs/platform-express';
import { StorageFile } from "src/dto/storage_file";
import { StorageService } from "src/service/storage_service";
import { Carousel } from 'src/entity/carousel.entity';
import { Response } from "express";

@Controller('carousel')
export class CarouselController {
  constructor(private CarouselService: CarouselService,
    private readonly storageService: StorageService,) { }

  @Post()
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        files: 1,
        fileSize: 1024 * 1024,
      }
    })
  )

  async uploadCarousel(
    @UploadedFile() file: Express.Multer.File,
    @Body() CreateCarouselDto: CreateCarouselDto,
    @Res() res: Response
  ) : Promise<Object> {
    console.log(CreateCarouselDto)
    const filename = file.originalname
    try {
      await this.storageService.save(
        "gcp/" + filename,
        file.buffer,
        [{ image_name: filename }]
      );
      await this.CarouselService.addCarousel(filename, CreateCarouselDto)
      return res.status(HttpStatus.OK).send("SUCCESS");
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).send("Data not create");
    }
  }

  @Get("/:id")
  async getCarouselData(@Param("id") carouselID: number, @Res() res: Response): Promise<Object>{

    let storageFile: StorageFile;

    try {
      const carouselData = await this.CarouselService.getCarousel(carouselID);
      const carouselName = carouselData.image_name;
      storageFile = await this.storageService.get("gcp/" + carouselName);
      return res.end(storageFile.buffer);
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).send("Data does not exist");
    }

  }




  @Put('/:id')
  @UseInterceptors(
    FileInterceptor("file", {
      limits: {
        files: 1,
        fileSize: 1024 * 1024,
      }
    })
  )

  async updataCarouselData(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @Body() CreateCarouselDto: CreateCarouselDto,
    @Res() res: Response
  ) : Promise<any> {

    const filename = file.originalname
    try {
      await this.storageService.save(
        "gcp/" + filename,
        file.buffer,
        [{ image_name: filename }]
      );
      const updataStatus = await this.CarouselService.updateCarousel(id,filename, CreateCarouselDto)
      
      if (!updataStatus) {
        return res.status(HttpStatus.NOT_FOUND).send("Data not defind");
      }
      return res.status(HttpStatus.OK).send("Upload SUCCESS");
    } catch (error) {
      return res.status(HttpStatus.NOT_FOUND).send("Upload not success");
    }
  }



  @Put('/del/:id')
  async deleteCarouselById(
    @Param('id') id: number,
    @Body() status: number,
    @Res() res: Response
    ): Promise<Object> {

    if(status){
      return res.status(HttpStatus.NOT_FOUND).send("Data is delete");
    }

    try {
      const updataStatus = await this.CarouselService.deleteCarousel(id,status);
      if (!updataStatus) {
        return res.status(HttpStatus.NOT_FOUND).send("Data not defind");
      }
      return res.status(HttpStatus.OK).send("Delete SUCCESS");
    } catch (error) {

      return res.status(HttpStatus.NOT_FOUND).send("Delete not success");
    }
  }
}
