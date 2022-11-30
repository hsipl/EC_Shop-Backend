import { Module } from '@nestjs/common';
import { SpecGroupModule } from './spec_group';
import { UserMoudle } from '../module/user';
import { AuthMoudle } from '../module/user_auth';
@Module({
    imports: [SpecGroupModule, UserMoudle, AuthMoudle],
    controllers: [],
    providers: [],
    exports: []
})

export class IndexModule { }