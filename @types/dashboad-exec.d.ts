import type { Status } from "./Approval"

export interface DashboardExecution {
  id: string
  organizationId: string
  flowName: string
  status: Status
  lastStep: string
  createdAt: string
  updatedAt: string
}