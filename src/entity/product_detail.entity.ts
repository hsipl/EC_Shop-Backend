import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { ProductImage } from './product_image.entity';

@Entity("product_detail")
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

  @Column({ type: 'tinyint', width: 1, comment: "0:on the shelf,1:take down", default: 1 })
  saleable: number;

  @Column({ type: 'tinyint', width: 1, comment: "0:efficient,1:invalid", default: 1 })
  valid: number;

  @ManyToOne(() => Product)
  product: Product

  @OneToMany(() => ProductImage, productImage => productImage.pdId)
  images: ProductImage[]

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
