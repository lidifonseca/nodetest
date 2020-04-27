export interface IParte {
  id?: number;
  categoria?: string;
  participante?: string;
  advogados?: any;
  processoId?: number;
}

export const defaultValue: Readonly<IParte> = {};
