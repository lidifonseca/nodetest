export interface ICliente {
  id?: number;
  ativo?: boolean;
  userId?: number;
}

export const defaultValue: Readonly<ICliente> = {
  ativo: false
};
