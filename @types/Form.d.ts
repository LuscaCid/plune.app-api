export type FormFieldType = 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'radio' | 'date'

export interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  required: boolean;
  value: string;
  options : string[] //em caso de select // checkbox
  order? : number;
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
