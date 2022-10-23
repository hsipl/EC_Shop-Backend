import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from 'src/dto/category';
import { Category } from 'src/entity/category.entity';
import { Repository } from 'typeorm';
import { IRepository } from 'src/interface/repository';

@Injectable()
export class CategoryService implements IRepository<Category, CategoryDto> {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.find({ where: { status: 0 } });
    }

    async findOne(id: number): Promise<Category> {
        return await this.categoryRepository.findOneBy({ id });
    }

    async create(data: CategoryDto): Promise<Category> {
        return await this.categoryRepository.save(data);
    }

    async update(id: number, data: CategoryDto): Promise<boolean> {
        const foundCategory = await this.categoryRepository.findOne({ where: { id } });
        if (!foundCategory) {
            return false;
        }
        return (this.categoryRepository.update(id, data)) ? true : false;
    }

    async remove(id: number, data: CategoryDto): Promise<boolean> {
        const foundCategory = await this.categoryRepository.findOne({ where: { id } });
        if (!foundCategory) {
            return false;
        }
        data.status = 1;
        return (this.categoryRepository.update(id, data)) ? true : false;
    }
}