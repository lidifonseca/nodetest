import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ProfissionalArquivo from '../domain/profissional-arquivo.entity';
import { ProfissionalArquivoRepository } from '../repository/profissional-arquivo.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalArquivoService {
  logger = new Logger('ProfissionalArquivoService');

  constructor(@InjectRepository(ProfissionalArquivoRepository) private profissionalArquivoRepository: ProfissionalArquivoRepository) {}

  async findById(id: string): Promise<ProfissionalArquivo | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalArquivoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProfissionalArquivo>): Promise<ProfissionalArquivo | undefined> {
    return await this.profissionalArquivoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalArquivo>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalArquivo[], number]> {
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
    return await this.profissionalArquivoRepository.findAndCount(options);
  }

  async save(profissionalArquivo: ProfissionalArquivo): Promise<ProfissionalArquivo | undefined> {
    return await this.profissionalArquivoRepository.save(profissionalArquivo);
  }

  async update(profissionalArquivo: ProfissionalArquivo): Promise<ProfissionalArquivo | undefined> {
    return await this.save(profissionalArquivo);
  }

  async delete(profissionalArquivo: ProfissionalArquivo): Promise<ProfissionalArquivo | undefined> {
    return await this.profissionalArquivoRepository.remove(profissionalArquivo);
  }
}
