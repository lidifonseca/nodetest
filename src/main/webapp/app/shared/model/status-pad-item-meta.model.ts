export interface IStatusPadItemMeta {
  id?: string;
  statusItemMeta?: string;
  styleLabel?: string;
  ordenacao?: number;
  ativo?: boolean;
}

export const defaultValue: Readonly<IStatusPadItemMeta> = {
  ativo: false
};
