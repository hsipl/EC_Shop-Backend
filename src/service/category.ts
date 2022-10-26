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
        const category: Category = new Category()
        Object.assign(category, data);
        return await this.categoryRepository.save(category);
    }

    async update(id: number, data: CategoryDto): Promise<boolean> {
        const foundCategory = await this.categoryRepository.findOne({ where: { id } });
        if (!foundCategory) {
            return false;
        }
        Object.assign(foundCategory, data);
        return await (this.categoryRepository.update(id, foundCategory)) ? true : false;
    }

    async remove(id: number): Promise<boolean> {
        const foundCategory = await this.categoryRepository.findOne({ where: { id } });
        if (!foundCategory) {
            return false;
        }
        foundCategory.status = 1;
        return await (this.categoryRepository.update(id, foundCategory)) ? true : false;
    }
}