import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import AlertasIndicadores from '../domain/alertas-indicadores.entity';
import { AlertasIndicadoresRepository } from '../repository/alertas-indicadores.repository';

const relationshipNames = [];
relationshipNames.push('padItemIndicadoresId');

@Injectable()
export class AlertasIndicadoresService {
  logger = new Logger('AlertasIndicadoresService');

  constructor(@InjectRepository(AlertasIndicadoresRepository) private alertasIndicadoresRepository: AlertasIndicadoresRepository) {}

  async findById(id: string): Promise<AlertasIndicadores | undefined> {
    const options = { relations: relationshipNames };
    return await this.alertasIndicadoresRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<AlertasIndicadores>): Promise<AlertasIndicadores | undefined> {
    return await this.alertasIndicadoresRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<AlertasIndicadores>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[AlertasIndicadores[], number]> {
    options.relations = relationshipNames;
    let where = '';
    let first = true;
    for (const i in filters) {
      if (filters.hasOwnProperty(i)) {
        const element = filters[i];
        if (!first) {
          where += 'and';
        } else {
          first = false;
        }
        if (element['operation'] === 'contains') {
          where += ' `AlertasIndicadores`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `AlertasIndicadores`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.alertasIndicadoresRepository.findAndCount(options);
  }

  async save(alertasIndicadores: AlertasIndicadores): Promise<AlertasIndicadores | undefined> {
    return await this.alertasIndicadoresRepository.save(alertasIndicadores);
  }

  async update(alertasIndicadores: AlertasIndicadores): Promise<AlertasIndicadores | undefined> {
    return await this.save(alertasIndicadores);
  }

  async delete(alertasIndicadores: AlertasIndicadores): Promise<AlertasIndicadores | undefined> {
    return await this.alertasIndicadoresRepository.remove(alertasIndicadores);
  }
}
