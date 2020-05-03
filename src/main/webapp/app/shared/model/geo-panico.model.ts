export interface IGeoPanico {
  id?: string;
  idPanico?: number;
  idPaciente?: number;
  latitude?: string;
  longitude?: string;
}

export const defaultValue: Readonly<IGeoPanico> = {};
