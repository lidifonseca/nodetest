import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import PadItemAtividade from '../domain/pad-item-atividade.entity';
import { PadItemAtividadeRepository } from '../repository/pad-item-atividade.repository';

const relationshipNames = [];
relationshipNames.push('idAtividade');
relationshipNames.push('idPadItem');

@Injectable()
export class PadItemAtividadeService {
  logger = new Logger('PadItemAtividadeService');

  constructor(@InjectRepository(PadItemAtividadeRepository) private padItemAtividadeRepository: PadItemAtividadeRepository) {}

  async findById(id: string): Promise<PadItemAtividade | undefined> {
    const options = { relations: relationshipNames };
    return await this.padItemAtividadeRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<PadItemAtividade>): Promise<PadItemAtividade | undefined> {
    return await this.padItemAtividadeRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<PadItemAtividade>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[PadItemAtividade[], number]> {
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
          where += ' `PadItemAtividade`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `PadItemAtividade`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.padItemAtividadeRepository.findAndCount(options);
  }

  async save(padItemAtividade: PadItemAtividade): Promise<PadItemAtividade | undefined> {
    return await this.padItemAtividadeRepository.save(padItemAtividade);
  }

  async update(padItemAtividade: PadItemAtividade): Promise<PadItemAtividade | undefined> {
    return await this.save(padItemAtividade);
  }

  async delete(padItemAtividade: PadItemAtividade): Promise<PadItemAtividade | undefined> {
    return await this.padItemAtividadeRepository.remove(padItemAtividade);
  }
}
