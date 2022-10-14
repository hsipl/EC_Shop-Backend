import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecGroupController } from 'src/controller/spec_group';
import { SpecGroup } from 'src/entity/spec_group.entity';
import { SpecGroupService } from 'src/service/spec_group';


@Module({
    imports: [TypeOrmModule.forFeature([SpecGroup])],
    controllers: [SpecGroupController],
    providers: [SpecGroupService],
    exports: [TypeOrmModule]
})

export class SpecGroupModule { }