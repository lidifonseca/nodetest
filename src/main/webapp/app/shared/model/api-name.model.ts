export interface IApiName {
  id?: string;
  apiName?: string;
  apiReceiver?: string;
  apiObs?: string;
  ativo?: boolean;
}

export const defaultValue: Readonly<IApiName> = {
  ativo: false
};
