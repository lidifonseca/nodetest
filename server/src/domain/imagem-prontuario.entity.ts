/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

/**
 * A ImagemProntuario.
 */
@Entity('imagem_prontuario')
export default class ImagemProntuario extends BaseEntity {
  @Column({ name: 'id_prontuario', nullable: false })
  idProntuario: string;

  @Column({ name: 'imagem', length: 100, nullable: false })
  imagem: string;

  @Column({ type: 'integer', name: 'ativo', nullable: false })
  ativo: number;

  @Column({ name: 'diretorio', length: 500 })
  diretorio: string;

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
