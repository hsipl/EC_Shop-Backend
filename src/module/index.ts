import { Module } from '@nestjs/common';
import { SpecGroupModule } from './spec_group';

@Module({
    imports: [SpecGroupModule],
    controllers: [],
    providers: [],
    exports: []
})

export class IndexModule { }