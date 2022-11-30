import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from 'src/controller/category';
import { Category } from 'src/entity/category.entity';
import { CategoryService } from 'src/service/category';



@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoryService],
    exports: [TypeOrmModule]
})

export class CategoryModule { }