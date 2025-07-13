import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Flow } from "./flow.entity";

@Entity("organization")
export class Organization {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: "name", type: "text" })
  name: string;

  @CreateDateColumn()
  createdAt: Date;
  @Column({ name: "logo", type: "text", nullable: true })
  logo?: string

  @JoinColumn({ name: "createdBy" })
  @ManyToOne(() => User)
  createdBy: User;

  @OneToMany(() => Flow, (flow) => flow.organization)
  flows: Flow[];
  
  @DeleteDateColumn()
  deletedAt?: Date;
}
