export interface IProfissionalDispositivoAtual {
  id?: string;
  idProfissional?: number;
  tqtTraqueostomia?: number;
  gttGastrostomia?: number;
  sneSondaNasoenteral?: number;
  svdSondaVesicalDeDemora?: number;
  svaSondaVesicalDeAlivio?: number;
  portACath?: number;
  piccAcessoVenosoCentral?: number;
  ventiladores?: number;
  uppUlceraPorPressao?: number;
  avpAcessoVenosoPeriferico?: number;
  uripen?: number;
  fraldaGeriatrica?: number;
  sngSondaNasogastrica?: number;
  bipap?: number;
  cpap?: number;
  cistostomia?: number;
  cateterNasalDeOxigenio?: number;
  mascaraDeVentilacao?: number;
  entubacaoOrotraqueal?: number;
  idUsuario?: number;
}

export const defaultValue: Readonly<IProfissionalDispositivoAtual> = {};
