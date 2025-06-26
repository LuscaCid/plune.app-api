import { Flow } from "@/@types/Flow";
import { IFlowRepository } from "../interfaces/FlowRepository";

export class FlowService {
  constructor(
    private readonly flowRepository: IFlowRepository
  ) { }

  update = async (flow: Flow) => {
    return await this.flowRepository.update(flow);
  }
  getOrganizationFlows = async (organizationId: string) => {
    return await this.flowRepository.getOrganizationFlows(organizationId);
  }
  create = async (flow: Flow) => {
    return await this.flowRepository.create(flow);
  }
  delete = async (flowId: string) => {
    return await this.flowRepository.delete(flowId);
  }
}