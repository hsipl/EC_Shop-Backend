import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    UpdateEvent,
} from 'typeorm'

import { User } from 'src/entity/user.entity'
import { encryptionService } from './user_encryption'

@EventSubscriber()

    export class UserSubscriber
        implements EntitySubscriberInterface<User>{
            listenTo(): string | Function {
                return User
            }

            async beforeInsert({
                entity,
              }: InsertEvent<User>): Promise<void> {
                if (entity.password) {
                  entity.password = await encryptionService.generateHash(
                    entity.password
                  );
                }
        }

            async beforeUpdate({
                entity,
                databaseEntity,
            }: UpdateEvent<User>): Promise<void> {
                if (entity.password) {
                const password = await encryptionService.generateHash(
                    entity.password
                );
            
                if (password !== databaseEntity?.password) {
                    entity.password = password;
                }
                }
            }
}