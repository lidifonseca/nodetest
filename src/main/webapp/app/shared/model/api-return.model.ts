export interface IApiReturn {
  id?: string;
  idApiName?: number;
  apiReturn?: string;
  apiType?: string;
  obs?: string;
  ativo?: number;
}

export const defaultValue: Readonly<IApiReturn> = {};