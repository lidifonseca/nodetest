export interface IProfissionalCategoriaContrato {
  id?: string;
  idProfissional?: string;
  idCategoriaContrato?: number;
  aceito?: number;
}

export const defaultValue: Readonly<IProfissionalCategoriaContrato> = {};
