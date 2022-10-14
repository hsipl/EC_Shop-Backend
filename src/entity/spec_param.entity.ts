import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { SpecGroup } from './spec_group.entity';

@Entity("spec_param")
export class SpecParam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "sg_id" })
  sgId: number;

  @ManyToOne(() => SpecGroup, specGroup => specGroup.params)
  @JoinColumn({ name: "sp_id" })
  spId: SpecGroup;

  @Column({ length: 50, comment: "parameter name" })
  name: string;

  @Column({ type: 'tinyint', width: 1, comment: "0:is a numeric parameter,1:not a numeric parameter", default: 0 })
  numeric: number;

  @Column({ length: 50 })
  unit: string;

  @Column({ type: 'tinyint', width: 1, comment: "0:is a general parameter,l:not a generic parameter", default: 1 })
  generic: number;

  @Column({ length: 50, comment: "parameter value" })
  segements: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

}
