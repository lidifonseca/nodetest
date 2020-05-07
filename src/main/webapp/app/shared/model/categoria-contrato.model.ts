export interface ICategoriaContrato {
  id?: string;
  contratoContentType?: string;
  contratoBase64?: string;
  contrato?: any;
  ativo?: number;
}

export const defaultValue: Readonly<ICategoriaContrato> = {};
