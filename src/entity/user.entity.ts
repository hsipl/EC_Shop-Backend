import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BeforeInsert
    
} from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Exclude()
    @Column()
    password: string

    @Column()
    region: string

    @Column()
    mail: string

    @Column()
    phone_num: string

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

    @DeleteDateColumn({name: 'deleteAt'})
    deletedAt: Date


    
}