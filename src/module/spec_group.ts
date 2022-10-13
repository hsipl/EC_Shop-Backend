import { Module } from '@nestjs/common';
import { SpecGroupController } from 'src/controller/spec_group';

@Module({
    controllers: [SpecGroupController],
    providers: [],
    exports: []
})

export class SpecGroupModule { }