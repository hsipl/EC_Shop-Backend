import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from 'src/dto/category/create_category';
import { GetCategoryDto } from 'src/dto/category/get_category';
import { Category } from 'src/entity/category.entity';
import { Repository } from 'typeorm';
import * as _ from "lodash";

@Injectable()
export class CategoryService {
    constructor(@InjectRepository(Category) private categoryRepository: Repository<Category>) { }

    // 目前只能找到兩個階層
    async findAll(): Promise<GetCategoryDto[]> {
        const categorys = await this.categoryRepository.find({ where: { status: 0 } });
        const maxLevel = _.get(_.maxBy(categorys, 'level'), 'level');
        const getData: GetCategoryDto[] = [];
        let isParent = true;
        for (let i = 1; i <= maxLevel; i++) {
            for (const category of categorys) {
                if (_.get(category, 'level') === i){
                    const d = new GetCategoryDto();
                    Object.assign(d, category);
                    if (isParent) {
                        getData.push(d);
                    } else {
                        const index = _.findIndex(getData, { id: _.get(category, 'parentId') });
                        if (_.has(getData[index], 'subCategory')) {
                            getData[index].subCategory.push(d);
                        } else {
                            _.assign(getData[index], {subCategory:[d]})
                        }
                    }
                }
            }
            isParent = false;
        }
        return getData;
    }

    async findOne(id: number): Promise<Category> {
        return await this.categoryRepository.findOneBy({ id });
    }

    async create(data: CreateCategoryDto): Promise<Category> {
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

    async update(id: number, data: CreateCategoryDto): Promise<boolean> {
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