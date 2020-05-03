export interface IStatusPadItemMeta {
  id?: string;
  statusItemMeta?: string;
  styleLabel?: string;
  ordenacao?: number;
  ativo?: number;
}

export const defaultValue: Readonly<IStatusPadItemMeta> = {};
