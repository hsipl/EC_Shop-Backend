import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SpecParam } from './spec_param.entity';

@Entity("spec_group")
export class SpecGroup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "sg_id" })
  sgId: number;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => SpecParam, specParam => specParam.spId)
  params: SpecParam[]

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
