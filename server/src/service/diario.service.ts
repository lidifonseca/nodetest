import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Diario from '../domain/diario.entity';
import { DiarioRepository } from '../repository/diario.repository';

const relationshipNames = [];
relationshipNames.push('idUsuario');
relationshipNames.push('idPaciente');

@Injectable()
export class DiarioService {
  logger = new Logger('DiarioService');

  constructor(@InjectRepository(DiarioRepository) private diarioRepository: DiarioRepository) {}

  async findById(id: string): Promise<Diario | undefined> {
    const options = { relations: relationshipNames };
    return await this.diarioRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Diario>): Promise<Diario | undefined> {
    return await this.diarioRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Diario>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Diario[], number]> {
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
          where += ' `Diario`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Diario`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.diarioRepository.findAndCount(options);
  }

  async save(diario: Diario): Promise<Diario | undefined> {
    return await this.diarioRepository.save(diario);
  }

  async update(diario: Diario): Promise<Diario | undefined> {
    return await this.save(diario);
  }

  async delete(diario: Diario): Promise<Diario | undefined> {
    return await this.diarioRepository.remove(diario);
  }
}
