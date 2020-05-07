export interface IPadItemIndicadores {
  id?: string;
  idUnidadeMedida?: number;
  titulo?: string;
  descricao?: any;
  meta?: number;
  maximoSt?: number;
  minimoSt?: number;
}

export const defaultValue: Readonly<IPadItemIndicadores> = {};
