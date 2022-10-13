import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SpecParam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sgId: number;

  @Column()
  spId: number;

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'tinyint', width: 1 })
  numeric: number;

  @Column({ length: 50 })
  unit: string;

  @Column({ type: 'tinyint', width: 1 })
  generic: number;

  @Column({ length: 50 })
  segements: string;
}
