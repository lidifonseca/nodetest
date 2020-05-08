import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import AtendimentoAssinaturas from '../domain/atendimento-assinaturas.entity';
import { AtendimentoAssinaturasRepository } from '../repository/atendimento-assinaturas.repository';

const relationshipNames = [];
relationshipNames.push('atendimento');
relationshipNames.push('profissional');
relationshipNames.push('paciente');

@Injectable()
export class AtendimentoAssinaturasService {
  logger = new Logger('AtendimentoAssinaturasService');

  constructor(
    @InjectRepository(AtendimentoAssinaturasRepository) private atendimentoAssinaturasRepository: AtendimentoAssinaturasRepository
  ) {}

  async findById(id: string): Promise<AtendimentoAssinaturas | undefined> {
    const options = { relations: relationshipNames };
    return await this.atendimentoAssinaturasRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<AtendimentoAssinaturas>): Promise<AtendimentoAssinaturas | undefined> {
    return await this.atendimentoAssinaturasRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<AtendimentoAssinaturas>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[AtendimentoAssinaturas[], number]> {
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
    return await this.atendimentoAssinaturasRepository.findAndCount(options);
  }

  async save(atendimentoAssinaturas: AtendimentoAssinaturas): Promise<AtendimentoAssinaturas | undefined> {
    return await this.atendimentoAssinaturasRepository.save(atendimentoAssinaturas);
  }

  async update(atendimentoAssinaturas: AtendimentoAssinaturas): Promise<AtendimentoAssinaturas | undefined> {
    return await this.save(atendimentoAssinaturas);
  }

  async delete(atendimentoAssinaturas: AtendimentoAssinaturas): Promise<AtendimentoAssinaturas | undefined> {
    return await this.atendimentoAssinaturasRepository.remove(atendimentoAssinaturas);
  }
}
