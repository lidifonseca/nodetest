export interface IImagemProntuario {
  id?: string;
  idProntuario?: string;
  imagem?: string;
  ativo?: boolean;
  diretorio?: string;
}

export const defaultValue: Readonly<IImagemProntuario> = {
  ativo: false
};
