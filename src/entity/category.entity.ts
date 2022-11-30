import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    Index
} from 'typeorm';

@Entity("category")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Index()
    @Column({ nullable: false, default: 1 })
    level: number;

    @Column({ default: 0, nullable: false })
    parentId: number;

    @Column({ default: 0, nullable: false })
    sort: number;

    @Column({ default: 0, nullable: false, type: "tinyint", comment: "0: 還在, 1:刪除" })
    status: number;

    @CreateDateColumn({ name: 'createdAt' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updatedAt' })
    updatedAt: Date;

}