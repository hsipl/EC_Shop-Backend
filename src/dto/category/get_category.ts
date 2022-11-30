import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';

export class GetCategoryDto{
    @ApiProperty({description: 'Category 的 id'})
    @IsNumber()
    readonly id: number;

    @ApiProperty({description: 'Category 的名稱'})
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({description: 'Category 的父輩 id'})
    @IsNumber()
    parentId: number;

    @ApiProperty({description: 'Category 的排序'})
    @IsNumber()
    sort: number;

    @ApiProperty({description: '子輩 Category'})
    @IsObject()
    subCategory: GetCategoryDto[];

}