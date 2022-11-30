import { Module } from '@nestjs/common';
import { CategoryModule } from './category';
import { SpecGroupModule } from './spec_group';

@Module({
    imports: [SpecGroupModule, CategoryModule],
    controllers: [],
    providers: [],
    exports: []
})

export class IndexModule { }