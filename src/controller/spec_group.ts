import { Controller, Get, Post, Response, HttpStatus } from '@nestjs/common';
import { SpecGroupService } from 'src/service/spec_group';

@Controller('specgroup')
export class SpecGroupController {
    constructor(private readonly specGroupService: SpecGroupService) { }

    @Get()
    async getAll(@Response() res) {
        const data = await this.specGroupService.findAll();
        res.status(HttpStatus.OK).json(data)
    }
    
}
