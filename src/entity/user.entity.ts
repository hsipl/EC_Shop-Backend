import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
    
} from 'typeorm'

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    password: string

    @Column()
    region: string

    @Column()
    mail: string

    @Column()
    phone_num: string

    @Column()
    status: number

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;
  
    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;
}