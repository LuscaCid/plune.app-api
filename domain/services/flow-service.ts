import { AppError } from "@/infra/utils/AppError";
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

  ensureFlowIsUnique = async (name : string, orgId: number) => {
    return await this.flowRepository.getFlowByNameAndOrganization(name, orgId);
  }
  update = async (flow: SaveFlowDTO, user: User) => {
    if (!flow.id) throw new AppError("The id is necessary for update a flow")
    return await this.flowRepository.save(flow, user);
  }

  getOrganizationFlows = async (payload: GetFlowDTO, type: FlowType) => {
    return await this.flowRepository.getOrganizationFlows(payload, type);
  }

  save = async (flow: SaveFlowDTO, user: User) => {
    if (flow.id && flow.type == "template") {
      const flowExists = await this.ensureFlowIsUnique(flow.name, flow.organizationId);
      if (flowExists) {
        throw new AppError("Flow template with same name already registered");
      }
    }
    return await this.flowRepository.save(flow, user);
  }

  delete = async (flowId: number) => {
    return await this.flowRepository.delete(flowId);
  }
}