import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SpecGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sgId: number;

  @Column({ length: 50 })
  name: string;
}
