import { IAlertasIndicadores } from 'app/shared/model/alertas-indicadores.model';
import { IPadItemIndicadores } from 'app/shared/model/pad-item-indicadores.model';
import { ICategoria } from 'app/shared/model/categoria.model';
import { ICidXPtaNovo } from 'app/shared/model/cid-x-pta-novo.model';

export interface ICidXPtaNovoPadItemIndi {
  id?: string;
  meta?: string;
  maximo?: string;
  minimo?: string;
  unidadeMedidaExtra?: string;
  unidadeMedidaId?: number;
  score?: number;
  alertasIndicadores?: IAlertasIndicadores[];
  padItemIndicadores?: string | any;
  categorias?: string | any;
  cidXPtaNovo?: string | any;
}

export const defaultValue: Readonly<ICidXPtaNovoPadItemIndi> = {};
