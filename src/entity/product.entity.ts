import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductDetail } from './product_detail.entity';
import { SpecGroup } from './spec_group.entity';

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ name: "sub_title", length: 50 })
  subTitle: string;

  @Column({ name: "category_id" })
  categoryId: number;

  @OneToOne(() => SpecGroup)
  @JoinColumn({ name: "sg_id" })
  specGroup: SpecGroup

  @OneToMany(() => ProductDetail, productDetail => productDetail.product)
  details: ProductDetail[]

  @Column({ type: 'tinyint', width: 1, comment: "0:on the shelf,1:take down", default: 1 })
  saleable: number;

  @Column({ type: 'tinyint', width: 1, comment: "0:efficient,1:invalid", default: 1 })
  valid: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
