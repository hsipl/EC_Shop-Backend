import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProductDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pId: string;

  @Column({ length: 50 })
  title: string;

  @Column()
  price: number;

  @Column({ type: 'json' })
  param: JSON;

  @Column({ type: 'tinyint', width: 1 })
  saleable: number;

  @Column({ type: 'tinyint', width: 1 })
  valid: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
