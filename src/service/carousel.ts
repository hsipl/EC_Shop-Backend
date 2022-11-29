import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carousel } from 'src/entity/carousel.entity';
import { Repository } from 'typeorm';
import { CreateCarouselDto } from 'src/dto/carousel';


@Injectable()
export class CarouselService {
  constructor(@InjectRepository(Carousel) private CarouselRepository: Repository<Carousel>) { }


  async getCarousel(id:number): Promise<Carousel> {

      let status = 1;
      return await this.CarouselRepository.findOne({
        where: {
          id: id,
          status:status
        }
      })
  }

  async addCarousel(file:string,CarouselData: CreateCarouselDto): Promise<Carousel> {
    
  
    const carousel = new Carousel();
    carousel.image_name = file;
    carousel.sort = CarouselData.sort;
    carousel.status = CarouselData.status;
    return await this.CarouselRepository.save(carousel);
  }




  async updateCarousel(
    id: number, 
    file: string,
    CarouselData: CreateCarouselDto
    ): Promise<boolean> {
    try {
      const carousel = new Carousel();
      carousel.image_name = file;
      carousel.sort = CarouselData.sort;
      carousel.status = CarouselData.status;
      await this.CarouselRepository.update(id, carousel);
      return true
    } catch (error) {
      return false;
    }
  }

  async deleteCarousel(id: number,status:number): Promise<boolean> {
    try {
      const carousel = new Carousel();
      carousel.status = status;
      await this.CarouselRepository.update(id,carousel);
      return true
    } catch (error) {
      return false
    }

  }
}