/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A PadItemHistDataIncComp.
 */
@Entity('pad_item_hist_data_inc_comp')
export default class PadItemHistDataIncComp extends BaseEntity {
  @Column({ name: 'id_pad_item' })
  idPadItem: string;

  @Column({ type: 'timestamp', name: 'data_pad_item_incompleto' })
  dataPadItemIncompleto: any;

  @Column({ type: 'timestamp', name: 'data_pad_item_completo' })
  dataPadItemCompleto: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
