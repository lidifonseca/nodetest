import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import AtendimentoImagem from '../domain/atendimento-imagem.entity';
import { AtendimentoImagemRepository } from '../repository/atendimento-imagem.repository';

const relationshipNames = [];

@Injectable()
export class AtendimentoImagemService {
  logger = new Logger('AtendimentoImagemService');

  constructor(@InjectRepository(AtendimentoImagemRepository) private atendimentoImagemRepository: AtendimentoImagemRepository) {}

  async findById(id: string): Promise<AtendimentoImagem | undefined> {
    const options = { relations: relationshipNames };
    return await this.atendimentoImagemRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<AtendimentoImagem>): Promise<AtendimentoImagem | undefined> {
    return await this.atendimentoImagemRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<AtendimentoImagem>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[AtendimentoImagem[], number]> {
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
    return await this.atendimentoImagemRepository.findAndCount(options);
  }

  async save(atendimentoImagem: AtendimentoImagem): Promise<AtendimentoImagem | undefined> {
    return await this.atendimentoImagemRepository.save(atendimentoImagem);
  }

  async update(atendimentoImagem: AtendimentoImagem): Promise<AtendimentoImagem | undefined> {
    return await this.save(atendimentoImagem);
  }

  async delete(atendimentoImagem: AtendimentoImagem): Promise<AtendimentoImagem | undefined> {
    return await this.atendimentoImagemRepository.remove(atendimentoImagem);
  }
}
