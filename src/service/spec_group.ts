import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SpecGroup } from 'src/entity/spec_group.entity';
import { Repository } from 'typeorm';


@Injectable()
export class SpecGroupService {
    constructor(@InjectRepository(SpecGroup) private specGroupRepository: Repository<SpecGroup>) { }


    findAll(): Promise<SpecGroup[]> {
        return this.specGroupRepository.find();
    }

    findOne(id: number): Promise<SpecGroup> {
        return this.specGroupRepository.findOneBy({ id });
    }

}