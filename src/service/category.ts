import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto, GetCategoryDto } from 'src/dto/category';
import { Category } from 'src/entity/category.entity';
import { Repository } from 'typeorm';
import { IRepository } from 'src/interface/repository';
import * as _ from "lodash";

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

    async findAll(): Promise<GetCategoryDto[]> {
        const categorys = await this.categoryRepository.find({ where: { status: 0 } });
        const maxLevel = _.max(_.map(categorys, 'level'));
        const getData: GetCategoryDto[] = [];
        for (let i = 1; i <= maxLevel; i++) {
            for (const c of categorys) {
                if (_.get(c, 'level') === 1) {
                    const d = new GetCategoryDto();
                    Object.assign(d, c);
                    getData.push(d)
                } else if (_.get(c, 'level') === i) {
                    const d = new GetCategoryDto();
                    Object.assign(d, c);
                    _.each(getData, function(value){
                        if(value.parentId === c.parentId){
                            value.subCategory.push(d);
                        }
                    })
                }
            }
        }
        return getData;
    }

    async findOne(id: number): Promise<Category> {
        return await this.categoryRepository.findOneBy({ id });
    }

    async create(data: CategoryDto): Promise<Category> {
        let defaultLevel = 0;
        if (data.parentId) { // 判斷 parentId 是否存在
            const parentData = await this.findOne(data.parentId)
            if (!parentData) {
                throw new Error('出錯囉!');
            }
            defaultLevel = parentData.level;
        }

        const category: Category = new Category()
        Object.assign(category, data);
        category.level = defaultLevel + 1;
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