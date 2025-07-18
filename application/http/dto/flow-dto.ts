import { Flow } from "@/domain/entities-pg/flow.entity";
import z from "zod";

export class FlowDTO {
  static type = z.enum(["template", "instance"]).default("template");

  static formField = z.object({
    id: z.string().min(1).optional(),
    name: z.string().min(1).optional(),
    label: z.string().optional(),
    placeholder: z.string().optional(),
    description: z.string().optional(),
    type: z.enum(['text', 'email', 'number', 'select', 'checkbox', 'radio', 'date']).default("text"),
    required: z.boolean().default(false),
    value: z.string().optional(),
    options: z.array(z.string()).optional(), //em caso de select // checkbox
    order: z.number().optional(),
    values: z.object({}).optional()
  })
  static sections = z.object({
    layout: z.enum(["cols-1", "cols-2", "cols-3", "cols-4"]),
    fields: z.array(FlowDTO.formField),
    id: z.string().min(1),
    order: z.number().optional()
  })

  static form = z.object({
    id: z.number().min(1).optional(),
    name: z.string().min(1),
    organizationId: z.number().min(1),
    sections: z.array(FlowDTO.sections)
  })
  static conditionalRule = z.object({
    fieldName: z.string(),
    operator: z.enum(["equals", "not_equals", "contains", "greater_than", "less_than"]),
    value: z.any(),
    targetNodeId: z.string(),
  })

  static flowNodeData = z.object({
    label: z.string().min(2),
    description: z.string().optional(),
    rules: z.array(FlowDTO.conditionalRule),             // se type === 'condition'
    status: z.enum(["pending", "completed", "failed", "skipped"]),
    createdBy: z.string(),
    form: FlowDTO.form,                         // se type === 'form'
    approvers: z.array(z.string()),     // se type === 'approval'
    webhookUrl: z.string(),             // se type === 'webhook'
  });

  static flowNode = z.object({
    id: z.number().min(1).optional(),
    type: z.enum(["stage", "form", "approval", "webhook", "condition"]),
    position: z.object({
      x: z.number(),
      y: z.number()
    }),
    data: FlowDTO.flowNodeData
  });

  static flowEdge = z.object({
    id: z.string(),
    source: z.string(),
    target: z.string(),
    sourceHandle: z.string(),
    targetHandle: z.string(),
    label: z.string().optional(),
  });

  static saveFlowDTO = z.object({
    id: z.number().min(1).optional(),
    organizationId: z.number().min(1),
    name: z.string().min(2),
    description: z.string().min(2).optional(),
    isPublished: z.boolean().optional(),
    currentStage: z.string().default("start"),
    type: FlowDTO.type,
    nodes: z.array(FlowDTO.flowNode).optional(),
    edges: z.array(FlowDTO.flowEdge).optional(),
  });

  static getFlowDTO = z.object({
    page: z.string().min(1),
    pageSize: z.string().optional(),
    isPublished: z.preprocess((val) => Boolean(val), z.boolean().optional()),
    orgId: z.string().min(1)
  })

}

//form
export type SaveFormDTO = z.infer<typeof FlowDTO.form>;

//flows
export type SaveFlowDTO = z.infer<typeof FlowDTO.saveFlowDTO>;
export type FlowTypeDTO = z.infer<typeof FlowDTO.type>;
export type GetFlowDTO = z.infer<typeof FlowDTO.getFlowDTO>;