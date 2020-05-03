import { Moment } from 'moment';

export interface IPadItemAlerta {
  id?: string;
  padItemMetaId?: number;
  envioEmailEm?: Moment;
  visualizadoEm?: Moment;
  criadoEm?: Moment;
  ativo?: boolean;
  mensagem?: string;
}

export const defaultValue: Readonly<IPadItemAlerta> = {
  ativo: false
};
