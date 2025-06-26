import { Flow } from "@/@types/Flow";

export interface IFlowRepository {
  create : (flow: Flow)=> Promise<Flow>;
  update : (flow: Flow)=> Promise<Flow>;
  delete : (flowId: string)=> Promise<void>;
  getOrganizationFlows : (organizationId: string)=> Promise<Flow[]>;
}