export interface IImagemProntuario {
  id?: string;
  idProntuario?: string;
  imagem?: string;
  ativo?: number;
  diretorio?: string;
}

export const defaultValue: Readonly<IImagemProntuario> = {};
