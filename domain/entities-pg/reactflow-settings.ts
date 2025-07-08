import { Entity } from "typeorm";

@Entity({ name: "reactflow_settings", synchronize: true })
export class ReactFlowSettings {
  edgesAnimated: boolean;
  
}