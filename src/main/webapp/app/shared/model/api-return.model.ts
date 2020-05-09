export interface IApiReturn {
  id?: string;
  idApiName?: number;
  apiReturn?: string;
  apiType?: string;
  obs?: string;
  ativo?: boolean;
}

export const defaultValue: Readonly<IApiReturn> = {
  ativo: false
};
