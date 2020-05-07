/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A PadItemHistDataIncComp.
 */
@Entity('tb_pad_item_hist_data_inc_comp')
export default class PadItemHistDataIncComp extends BaseEntity {
  @Column({ name: 'ID_PAD_ITEM' })
  idPadItem: string;

  @Column({ type: 'timestamp', name: 'DATA_PAD_ITEM_INCOMPLETO' })
  dataPadItemIncompleto: any;

  @Column({ type: 'timestamp', name: 'DATA_PAD_ITEM_COMPLETO' })
  dataPadItemCompleto: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
