import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import AtendimentoAcompanhamentoPush from '../domain/atendimento-acompanhamento-push.entity';
import { AtendimentoAcompanhamentoPushRepository } from '../repository/atendimento-acompanhamento-push.repository';

const relationshipNames = [];

@Injectable()
export class AtendimentoAcompanhamentoPushService {
  logger = new Logger('AtendimentoAcompanhamentoPushService');

  constructor(
    @InjectRepository(AtendimentoAcompanhamentoPushRepository)
    private atendimentoAcompanhamentoPushRepository: AtendimentoAcompanhamentoPushRepository
  ) {}

  async findById(id: string): Promise<AtendimentoAcompanhamentoPush | undefined> {
    const options = { relations: relationshipNames };
    return await this.atendimentoAcompanhamentoPushRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<AtendimentoAcompanhamentoPush>): Promise<AtendimentoAcompanhamentoPush | undefined> {
    return await this.atendimentoAcompanhamentoPushRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<AtendimentoAcompanhamentoPush>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[AtendimentoAcompanhamentoPush[], number]> {
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
    return await this.atendimentoAcompanhamentoPushRepository.findAndCount(options);
  }

  async save(atendimentoAcompanhamentoPush: AtendimentoAcompanhamentoPush): Promise<AtendimentoAcompanhamentoPush | undefined> {
    return await this.atendimentoAcompanhamentoPushRepository.save(atendimentoAcompanhamentoPush);
  }

  async update(atendimentoAcompanhamentoPush: AtendimentoAcompanhamentoPush): Promise<AtendimentoAcompanhamentoPush | undefined> {
    return await this.save(atendimentoAcompanhamentoPush);
  }

  async delete(atendimentoAcompanhamentoPush: AtendimentoAcompanhamentoPush): Promise<AtendimentoAcompanhamentoPush | undefined> {
    return await this.atendimentoAcompanhamentoPushRepository.remove(atendimentoAcompanhamentoPush);
  }
}
