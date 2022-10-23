import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CategoryDto {
    @IsNumber()
    readonly id: number;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    parentId: number;

    @IsNumber()
    sort: number;

    @IsNumber()
    status: number;

}