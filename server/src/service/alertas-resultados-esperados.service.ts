import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import AlertasResultadosEsperados from '../domain/alertas-resultados-esperados.entity';
import { AlertasResultadosEsperadosRepository } from '../repository/alertas-resultados-esperados.repository';

const relationshipNames = [];
relationshipNames.push('resultadosId');

@Injectable()
export class AlertasResultadosEsperadosService {
  logger = new Logger('AlertasResultadosEsperadosService');

  constructor(
    @InjectRepository(AlertasResultadosEsperadosRepository)
    private alertasResultadosEsperadosRepository: AlertasResultadosEsperadosRepository
  ) {}

  async findById(id: string): Promise<AlertasResultadosEsperados | undefined> {
    const options = { relations: relationshipNames };
    return await this.alertasResultadosEsperadosRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<AlertasResultadosEsperados>): Promise<AlertasResultadosEsperados | undefined> {
    return await this.alertasResultadosEsperadosRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<AlertasResultadosEsperados>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[AlertasResultadosEsperados[], number]> {
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
          where += ' `AlertasResultadosEsperados`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `AlertasResultadosEsperados`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.alertasResultadosEsperadosRepository.findAndCount(options);
  }

  async save(alertasResultadosEsperados: AlertasResultadosEsperados): Promise<AlertasResultadosEsperados | undefined> {
    return await this.alertasResultadosEsperadosRepository.save(alertasResultadosEsperados);
  }

  async update(alertasResultadosEsperados: AlertasResultadosEsperados): Promise<AlertasResultadosEsperados | undefined> {
    return await this.save(alertasResultadosEsperados);
  }

  async delete(alertasResultadosEsperados: AlertasResultadosEsperados): Promise<AlertasResultadosEsperados | undefined> {
    return await this.alertasResultadosEsperadosRepository.remove(alertasResultadosEsperados);
  }
}
