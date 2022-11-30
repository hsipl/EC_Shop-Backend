import { Controller, Get, Post, Response, HttpStatus, Param, Body, Delete, Put } from '@nestjs/common';
import { CreateCategoryDto } from 'src/dto/category/create_category';
import { CategoryService } from 'src/service/category';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    /**
     * 取得分類
     * @param res 
     */
    @Get()
    async getAll(@Response() res) {
        const data = await this.categoryService.findAll();
        res.status(HttpStatus.OK).json(data)
    }
    /**
     * 使用 id 取得分類
     * @param res 
     * @param id category id 
     */
    @Get('/:id')
    async getById(@Response() res, @Param('id') id: number) {
        const data = await this.categoryService.findOne(id);
        res.status(HttpStatus.OK).json(data)
    }
    /**
     * 新增分類
     * @param categoryDTO 
     * @param res 
     */
    @Post()
    async create(@Body() categoryDTO: CreateCategoryDto, @Response() res) {
        try {
            await this.categoryService.create(categoryDTO);
            res.status(HttpStatus.OK).json({ status: 'success' });
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        res.status(HttpStatus.OK).json()
    }

    /**
     * 更新分類
     * @param categoryDTO 
     * @param res 
     */
    @Put()
    async update(@Body() categoryDTO: CreateCategoryDto, @Response() res) {
        try {
            const isUpdate = this.categoryService.update(categoryDTO.id, categoryDTO);
            res.status(HttpStatus.OK).json({ status: isUpdate ? 'success' : 'fail' });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * 刪除分類
     * @param res 
     * @param id 
     */
    @Delete('/:id')
    async delete(@Response() res, @Param('id') id: number) {
        try {
            const isDelete = await this.categoryService.remove(id);
            res.status(HttpStatus.OK).json({ status: isDelete ? 'success' : 'fail' });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}