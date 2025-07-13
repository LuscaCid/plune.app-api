import { Flow } from "@/domain/entities-pg/flow.entity";
import { Repository } from "typeorm";
import { AppError } from "../utils/AppError";
import { FlowType } from "@/application/router/flow-routes";
import { User } from "@/domain/entities-pg/user.entity";
import { GetFlowDTO, SaveFlowDTO } from "@/application/http/dto/flow-dto";
import { Organization } from "@/domain/entities-pg/organization.entity";

export class FlowRepository {
  static LIMIT = 10
  constructor(
    private readonly flowRepo: Repository<Flow>,
  ) { }

  restore = async (id: number) => {
    return await this.flowRepo.restore(id);
  }

  getFlowByNameAndOrganization = async (name: string, orgId: number) => {
    return await this.flowRepo.findOneBy({ name, organization: { id: orgId } })
  }
  save = async (flow: SaveFlowDTO, user: User) => {
    console.log(flow.isPublished)
    if (flow.id) {
      const savingFlow = await this.flowRepo.findOneBy({ id: flow.id });
      if (!savingFlow) {
        throw new AppError('flow not found', 404)
      }
      Object.assign(savingFlow, flow);
      savingFlow.isPublished = flow.isPublished ?? false;
      return await this.flowRepo.save(savingFlow);
    }
    const newFlow = new Flow();

    Object.assign(newFlow, flow);
    newFlow.organization = { id: flow.organizationId } as Organization;
    newFlow.createdBy = { id: user.id } as User;
    newFlow.isPublished = flow.isPublished ?? false;

    return await this.flowRepo.save(newFlow)
  }
  delete = async (flowId: number) => {
    await this.flowRepo.softDelete({ id: flowId });
  }
  getOrganizationFlows = async (payload: GetFlowDTO, type: FlowType) => {
    const size = Number(payload.pageSize) ? Number(payload.pageSize) : FlowRepository.LIMIT;
    const skip = (Number(payload.page) - 1) * size;

    const query = this.flowRepo.createQueryBuilder("flow")
      .innerJoin("flow.organization", "organization")
      .where("organization.id = :id", { id: payload.orgId })
      .andWhere("flow.type = :type", { type });

    // if (payload.isPublished != undefined) {
    //   query.andWhere("flow.isPublished = :isPublished", { isPublished: payload.isPublished })
    // }
    const data = await query
      .take(size)
      .skip(skip)
      .orderBy({ "flow.createdAt": "DESC", "flow.name": "DESC" })
      .getMany();

    const count = await query.getCount();
    return { data, count }
  }


  // TODO: update more minucious inside the nodes in flow schema 
  updateNodePosition = async (flowId: string, nodeId: string, pos: { x: number, y: number }) => {
    // return await this.flowRepo.findOneAndUpdate({
    //   '$'
    // })
  }
}