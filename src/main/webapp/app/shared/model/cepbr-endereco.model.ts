export interface ICepbrEndereco {
  id?: string;
  cep?: string;
  logradouro?: string;
  tipoLogradouro?: string;
  complemento?: string;
  local?: string;
}

export const defaultValue: Readonly<ICepbrEndereco> = {};
