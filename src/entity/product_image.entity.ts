import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductDetail } from './product_detail.entity';

@Entity("product_image")
export class ProductImage {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductDetail, productDetail => productDetail.images)
  @JoinColumn({ name: "pd_id" })
  pdId: number;

  @Column({ length: 200 })
  image: string;
}
