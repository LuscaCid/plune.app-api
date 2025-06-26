export type Status = 'pending' | 'approved' | 'rejected'
export interface Approval {
  id: string
  organizationId: string
  flowId: string
  flowName: string
  stepId: string
  approverId: string
  status: ApprovalStatus
  createdAt: string
  deadline: string
}