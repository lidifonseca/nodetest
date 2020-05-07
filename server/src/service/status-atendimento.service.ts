import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import StatusAtendimento from '../domain/status-atendimento.entity';
import { StatusAtendimentoRepository } from '../repository/status-atendimento.repository';

const relationshipNames = [];

@Injectable()
export class StatusAtendimentoService {
  logger = new Logger('StatusAtendimentoService');

  constructor(@InjectRepository(StatusAtendimentoRepository) private statusAtendimentoRepository: StatusAtendimentoRepository) {}

  async findById(id: string): Promise<StatusAtendimento | undefined> {
    const options = { relations: relationshipNames };
    return await this.statusAtendimentoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<StatusAtendimento>): Promise<StatusAtendimento | undefined> {
    return await this.statusAtendimentoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<StatusAtendimento>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[StatusAtendimento[], number]> {
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
    return await this.statusAtendimentoRepository.findAndCount(options);
  }

  async save(statusAtendimento: StatusAtendimento): Promise<StatusAtendimento | undefined> {
    return await this.statusAtendimentoRepository.save(statusAtendimento);
  }

  async update(statusAtendimento: StatusAtendimento): Promise<StatusAtendimento | undefined> {
    return await this.save(statusAtendimento);
  }

  async delete(statusAtendimento: StatusAtendimento): Promise<StatusAtendimento | undefined> {
    return await this.statusAtendimentoRepository.remove(statusAtendimento);
  }
}
