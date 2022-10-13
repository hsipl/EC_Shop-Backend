import { Column, Entity } from 'typeorm';

@Entity()
export class ProductDetail {
  @Column()
  pdId: number;

  @Column({ length: 200 })
  image: string;
}
