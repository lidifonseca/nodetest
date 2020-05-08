import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import AlertasIndicadores from '../domain/alertas-indicadores.entity';
import { AlertasIndicadoresRepository } from '../repository/alertas-indicadores.repository';

const relationshipNames = [];
relationshipNames.push('padItemIndicadores');

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
    let where = {};
    for (const i in filters) {
      if (filters.hasOwnProperty(i)) {
        const element = filters[i];
        if (element['operation'] === 'contains') {
          where[element['column']] = Like('%' + element['value'] + '%');
        } else if (element['operation'] === 'equals') {
          where[element['column']] = Equal(element['value']);
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
