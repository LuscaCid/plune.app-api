export type FormFieldType = 'text' | 'email' | 'number' | 'select' | 'checkbox' | 'radio' | 'date' | "password"

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
  deletedAt: Date;
  sections: FormSections[]
}

export type SectionLayout = "cols-1" | "cols-2" | "cols-3" | "cols-4";
export interface FormSections {
  layout: SectionLayout;
  fields: FormField[];
  id: string;
  order?: number;

} 