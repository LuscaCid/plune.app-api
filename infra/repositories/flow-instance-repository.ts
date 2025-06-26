import { Flow } from "@/@types/Flow";
import { IFlowRepository } from "@/domain/interfaces/FlowRepository";
import { Model } from "mongoose";
export enum FlowOperation {
  Instance = "instance",
  Template = "template"
}
export class FlowInstanceRepository implements IFlowRepository {
  constructor(
    private readonly flowModel: Model<Flow>,
  ) { }

  update = async (flow: Flow) => {
    return await this.flowModel.findOneAndUpdate({ id: flow.id }, flow) as Flow;
  }
  create = async (flow: Flow) => {
    return await this.flowModel.create(flow)
  }
  delete = async (flowId: string) => {
    await this.flowModel.deleteOne({ id: flowId });
  }
  getOrganizationFlows = async (organizationId: string) => {
    return await this.flowModel.find({ organizationId })
  }
  updateNodePosition = async (flowId: string, nodeId: string, pos: { x: number, y: number }) => {
    // return await this.flowModel.findOneAndUpdate({
    //   '$'
    // })
  }
}