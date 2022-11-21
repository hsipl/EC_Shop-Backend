import { Entity, 
        Column, 
        PrimaryGeneratedColumn,
        UpdateDateColumn,
        CreateDateColumn } from "typeorm";

@Entity()
export class Carousel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 255})
  image_name: string;

  @Column({type: 'int'})
  sort: number;

  @Column({type: 'int'})
  status: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)'
    })
  createdAt: Date;

  @UpdateDateColumn({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        onUpdate: 'CURRENT_TIMESTAMP(6)'
    })
  updatedAt: Date;
}