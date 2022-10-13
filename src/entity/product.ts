import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 50 })
  subTitle: string;

  @Column()
  categoryId: number;

  @Column()
  sgId: number;

  @Column({ type: 'tinyint', width: 1 })
  saleable: number;

  @Column({ type: 'tinyint', width: 1 })
  valid: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
