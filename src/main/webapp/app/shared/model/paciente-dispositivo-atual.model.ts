export interface IPacienteDispositivoAtual {
  id?: string;
  idPaciente?: number;
  idPacienteDispositivo?: number;
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
  ileostomia?: number;
  jejunostomia?: number;
  colostomia?: number;
  idUsuario?: number;
}

export const defaultValue: Readonly<IPacienteDispositivoAtual> = {};
