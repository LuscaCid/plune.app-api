export type FormFieldType = 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'radio' | 'date'

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  description?: string;
  required?: boolean;
  value?: string;
  options?: string[] //em caso de select // checkbox
  order?: number;
  values?: Record<string, any> // em caso de mestre detalhe
}

export interface Form {
  id: string
  name: string
  organizationId: string
  createdBy: string
  createdAt: string
  updatedAt: string
  fields: FormField[]
}
