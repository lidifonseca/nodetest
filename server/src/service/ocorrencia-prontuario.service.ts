import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import OcorrenciaProntuario from '../domain/ocorrencia-prontuario.entity';
import { OcorrenciaProntuarioRepository } from '../repository/ocorrencia-prontuario.repository';

const relationshipNames = [];

@Injectable()
export class OcorrenciaProntuarioService {
  logger = new Logger('OcorrenciaProntuarioService');

  constructor(@InjectRepository(OcorrenciaProntuarioRepository) private ocorrenciaProntuarioRepository: OcorrenciaProntuarioRepository) {}

  async findById(id: string): Promise<OcorrenciaProntuario | undefined> {
    const options = { relations: relationshipNames };
    return await this.ocorrenciaProntuarioRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<OcorrenciaProntuario>): Promise<OcorrenciaProntuario | undefined> {
    return await this.ocorrenciaProntuarioRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<OcorrenciaProntuario>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[OcorrenciaProntuario[], number]> {
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
          where += ' `OcorrenciaProntuario`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `OcorrenciaProntuario`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.ocorrenciaProntuarioRepository.findAndCount(options);
  }

  async save(ocorrenciaProntuario: OcorrenciaProntuario): Promise<OcorrenciaProntuario | undefined> {
    return await this.ocorrenciaProntuarioRepository.save(ocorrenciaProntuario);
  }

  async update(ocorrenciaProntuario: OcorrenciaProntuario): Promise<OcorrenciaProntuario | undefined> {
    return await this.save(ocorrenciaProntuario);
  }

  async delete(ocorrenciaProntuario: OcorrenciaProntuario): Promise<OcorrenciaProntuario | undefined> {
    return await this.ocorrenciaProntuarioRepository.remove(ocorrenciaProntuario);
  }
}
