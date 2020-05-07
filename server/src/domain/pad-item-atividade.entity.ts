/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

/**
 * A PadItemAtividade.
 */
@Entity('tb_pad_item_atividade')
export default class PadItemAtividade extends BaseEntity {
  @Column({ type: 'date', name: 'DATA_INICIO' })
  dataInicio: any;

  @Column({ type: 'date', name: 'DATA_FIM' })
  dataFim: any;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
