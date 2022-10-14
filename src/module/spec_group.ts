import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecGroupController } from 'src/controller/spec_group';
import { SpecGroup } from 'src/entity/spec_group.entity';


@Module({
    imports: [TypeOrmModule.forFeature([SpecGroup])],
    controllers: [SpecGroupController],
    providers: [],
    exports: [TypeOrmModule]
})

export class SpecGroupModule { }