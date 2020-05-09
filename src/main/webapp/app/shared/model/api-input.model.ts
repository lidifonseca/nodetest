export interface IApiInput {
  id?: string;
  idApiName?: number;
  apiInput?: string;
  apiType?: string;
  obs?: string;
  ativo?: boolean;
}

export const defaultValue: Readonly<IApiInput> = {
  ativo: false
};
