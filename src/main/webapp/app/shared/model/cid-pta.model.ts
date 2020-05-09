export interface ICidPta {
  id?: string;
  idDescPta?: number;
  idCid?: number;
  idAtividade?: number;
  ativo?: boolean;
}

export const defaultValue: Readonly<ICidPta> = {
  ativo: false
};
