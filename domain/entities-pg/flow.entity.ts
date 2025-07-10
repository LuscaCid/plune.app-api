import { FlowEdge, FlowNode } from "@/@types/Flow";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Organization } from "./organization.entity";
import { FlowType } from "@/application/router/flow-routes";

@Entity("flow")
export class Flow {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: "name", type: "text" })
  name: string;

  @Column({ nullable: true, name: "description", type: "text" })
  description?: string;

  @Column({ name: "currentStage", type: "text" })
  currentStage: string;

  @Column({ name: "isPublished", type: "boolean", default: false })
  isPublished: boolean;

  @Column({
    type: "enum",
    enum: ["template", "instance"] satisfies FlowType[],
    default: "template",
    name: "type"
  })
  type: "template" | "instance";

  @Column({ name: "nodes", type: "jsonb" })
  nodes: FlowNode[];

  @Column({ name: "edges", type: "jsonb" })
  edges: FlowEdge[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.flows)
  @JoinColumn({ name: "createdBy" })
  createdBy: User

  @ManyToOne(() => Organization)
  @JoinColumn({ name: "organizationId" })
  organization: Organization;
}
