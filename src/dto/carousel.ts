import { MinLength, MaxLength, IsString ,IsNumber, IsNotEmpty} from 'class-validator';

export class CreateCarouselDto {

    @MinLength(1)
    @MaxLength(10)
    @IsNumber()
    sort: number;

    @IsNumber()
    status: number;
}