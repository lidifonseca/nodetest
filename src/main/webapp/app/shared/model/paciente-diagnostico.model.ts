export interface IPacienteDiagnostico {
  id?: string;
  observacao?: string;
  ativo?: number;
  cidPrimario?: boolean;
  complexidade?: string;
  cidComAlta?: boolean;
}

export const defaultValue: Readonly<IPacienteDiagnostico> = {
  cidPrimario: false,
  cidComAlta: false
};
