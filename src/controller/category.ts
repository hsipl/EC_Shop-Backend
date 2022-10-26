import { Controller, Get, Post, Response, HttpStatus, Param, Body, Patch, Delete, Put } from '@nestjs/common';
import { CategoryDto } from 'src/dto/category';
import { CategoryService } from 'src/service/category';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get()
    async getAll(@Response() res) {
        const data = await this.categoryService.findAll();
        res.status(HttpStatus.OK).json(data)
    }

    @Get('/:id')
    async getById(@Response() res, @Param('id') id: number) {
        const data = await this.categoryService.findOne(id);
        res.status(HttpStatus.OK).json(data)
    }

    @Post()
    async create(@Body() categoryDTO: CategoryDto, @Response() res) {
        try {
            await this.categoryService.create(categoryDTO);
            res.status(HttpStatus.OK).json({ status: 'success' });
        } catch (error) {
            console.error(error);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        res.status(HttpStatus.OK).json()
    }

    @Put()
    async update(@Body() categoryDTO: CategoryDto, @Response() res) {
        try {
            const isUpdate = this.categoryService.update(categoryDTO.id, categoryDTO);
            res.status(HttpStatus.OK).json({ status: isUpdate ? 'success' : 'fail' });
        } catch (error) {
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
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