export interface IProfissionalAreaAtuacaoNew {
  id?: string;
  idProfissional?: string;
  cepArea?: string;
  cepFim?: string;
  ativo?: boolean;
  cepIni?: string;
}

export const defaultValue: Readonly<IProfissionalAreaAtuacaoNew> = {
  ativo: false
};
