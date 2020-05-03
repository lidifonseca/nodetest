export interface IApiInput {
  id?: string;
  idApiName?: number;
  apiInput?: string;
  apiType?: string;
  obs?: string;
  ativo?: number;
}

export const defaultValue: Readonly<IApiInput> = {};
