import { ObjectIdColumn, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ name: 'ID' })
  id?: number;
  @Column({ name: 'ID_USUARIO',  nullable: true })
  createdBy?: string;
  @Column({ name: 'DATA_POST', nullable: true })
  createdDate?: Date;
  @Column({ name: 'ID_LAST_USUARIO', nullable: true })
  lastModifiedBy?: string;
  @Column({ name: 'LAST_DATA_MODIFICADO',  nullable: true })
  lastModifiedDate?: Date;
}
