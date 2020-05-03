import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import AcoesRespostas from '../domain/acoes-respostas.entity';
import { AcoesRespostasRepository } from '../repository/acoes-respostas.repository';

const relationshipNames = [];
relationshipNames.push('respostasId');
relationshipNames.push('perguntasQuestionarioId');

@Injectable()
export class AcoesRespostasService {
  logger = new Logger('AcoesRespostasService');

  constructor(@InjectRepository(AcoesRespostasRepository) private acoesRespostasRepository: AcoesRespostasRepository) {}

  async findById(id: string): Promise<AcoesRespostas | undefined> {
    const options = { relations: relationshipNames };
    return await this.acoesRespostasRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<AcoesRespostas>): Promise<AcoesRespostas | undefined> {
    return await this.acoesRespostasRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<AcoesRespostas>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[AcoesRespostas[], number]> {
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
          where += ' `AcoesRespostas`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `AcoesRespostas`.`' + element['column'] + '` = "' + element['value'] + '" ';
        }
      }
    }
    options.where = where;
    return await this.acoesRespostasRepository.findAndCount(options);
  }

  async save(acoesRespostas: AcoesRespostas): Promise<AcoesRespostas | undefined> {
    return await this.acoesRespostasRepository.save(acoesRespostas);
  }

  async update(acoesRespostas: AcoesRespostas): Promise<AcoesRespostas | undefined> {
    return await this.save(acoesRespostas);
  }

  async delete(acoesRespostas: AcoesRespostas): Promise<AcoesRespostas | undefined> {
    return await this.acoesRespostasRepository.remove(acoesRespostas);
  }
}
