import { AppError } from "@/infra/utils/AppError";
import { Flow } from "../entities-pg/flow.entity";
import { IFlowRepository } from "../interfaces/FlowRepository";
import { FlowRepository } from "@/infra/repositories/flow-repository";
import { FlowType } from "@/application/router/flow-routes";
import { User } from "../entities-pg/user.entity";
import { GetFlowDTO, SaveFlowDTO } from "@/application/http/dto/flow-dto";

export class FlowService {
  constructor(
    private readonly flowRepository: FlowRepository
  ) { }
  updateNodePosition = async () => {

  }

  update = async (flow: SaveFlowDTO, user: User) => {
    if (!flow.id) throw new AppError("The id is necessary for update a flow")
    return await this.flowRepository.save(flow, user);
  }

  getOrganizationFlows = async (payload: GetFlowDTO, type: FlowType) => {
    return await this.flowRepository.getOrganizationFlows(payload, type);
  }

  save = async (flow: SaveFlowDTO, user: User) => {
    return await this.flowRepository.save(flow, user);
  }

  delete = async (flowId: string) => {
    return await this.flowRepository.delete(flowId);
  }
}