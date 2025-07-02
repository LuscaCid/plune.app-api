import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("organization")
export class Organization {
  @PrimaryGeneratedColumn({ name : 'id' })
  id: string;

  @Column({ name: "name", type: "text" })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @JoinColumn({ name: "createdBy" })
  @ManyToOne(() => User)
  createdBy: User;

}
