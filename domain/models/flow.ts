import { model, Schema } from "mongoose";
import { Flow as IFlow, FlowEdge, FlowNode } from "@/@types/Flow";

// Posição do nó (React Flow)
const positionSchema = new Schema({
  x: { type: Number, required: true },
  y: { type: Number, required: true },
}, { _id: false });

// Condições (condition rules)
const conditionRuleSchema = new Schema({
  fieldName: { type: String, required: true },
  operator: {
    type: String,
    enum: ["equals", "not_equals", "contains", "greater_than", "less_than"],
    required: true
  },
  value: { type: Schema.Types.Mixed, required: true }, // pode ser string, number ou boolean
  targetNodeId: { type: String, required: true },
}, { _id: false });

const formFieldSchema = new Schema({
  name: { type: String },
  label: { type: String },
  type: { type: String, enum: ['text', 'email', 'number', 'select', 'checkbox', 'radio', 'date'] },
  required: { type: Boolean, required: false, default: false },
  value: { type: String },
  options: { type: [String] },
  order: { type: String },
})

const formSchema = new Schema({
  id: { type: String, },
  name: { type: String, },
  organizationId: { type: String, },
  createdBy: { type: String, },
  createdAt: { type: String, },
  updatedAt: { type: String, },
  fields: { type: [formFieldSchema], required: true },
})

// Dados do node
const nodeDataSchema = new Schema({
  label: { type: String },
  description: { type: String },
  rules: { type: [conditionRuleSchema], default: undefined },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "skipped"],
    required: true
  },
  createdBy: { type: String },
  form: { type: formSchema, required: false }, // pode receber um objeto, se necessário
  approvers: { type: [String], default: undefined, required: false },
  webhookUrl: { type: String, required: false },
}, { _id: false });

// Schema do node
const nodeSchema = new Schema({
  id: { type: String, required: true },
  type: {
    type: String,
    enum: ["start", "form", "approval", "webhook", "end", "condition"],
    required: true
  },
  position: { type: positionSchema, required: true },
  data: { type: nodeDataSchema, required: true },
}, { _id: false });

// Schema da aresta (edge)
const edgeSchema = new Schema({
  id: { type: String, required: true },
  source: { type: String, required: true },
  target: { type: String, required: true },
  label: { type: String },
}, { _id: false });

// Schema principal do Flow
const flowSchema = new Schema<IFlow>({
  createdAt: { type: String, required: true },
  createdBy: { type: String, required: true },
  currentStage: { type: String, required: true },
  description: { type: String },
  organizationId: { type: String },
  id: { type: String, required: true },
  isPublished: { type: Boolean, required: true },
  name: { type: String, required: true },
  updatedAt: { type: String, required: true },
  nodes: { type: [nodeSchema], required: true },
  edges: { type: [edgeSchema], required: true },
});

export const flowInstanceModel = model<IFlow>('flow_instance', flowSchema, 'flow_instance');
export const flowTemplateModel = model<IFlow>('flow_template', flowSchema, 'flow_template');
