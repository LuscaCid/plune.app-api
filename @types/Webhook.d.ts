export type WebhookMethods = 'POST' | 'GET' | 'PUT' | 'DELETE';
export interface Webhook {
  id: string
  organizationId: string
  name: string
  url: string
  method: WebhookMethods
  isActive: boolean
  createdAt: string
  updatedAt: string
}