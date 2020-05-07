import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ProfissionalDispositivoComplexidade from '../domain/profissional-dispositivo-complexidade.entity';
import { ProfissionalDispositivoComplexidadeRepository } from '../repository/profissional-dispositivo-complexidade.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalDispositivoComplexidadeService {
  logger = new Logger('ProfissionalDispositivoComplexidadeService');

  constructor(
    @InjectRepository(ProfissionalDispositivoComplexidadeRepository)
    private profissionalDispositivoComplexidadeRepository: ProfissionalDispositivoComplexidadeRepository
  ) {}

  async findById(id: string): Promise<ProfissionalDispositivoComplexidade | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalDispositivoComplexidadeRepository.findOne(id, options);
  }

  async findByfields(
    options: FindOneOptions<ProfissionalDispositivoComplexidade>
  ): Promise<ProfissionalDispositivoComplexidade | undefined> {
    return await this.profissionalDispositivoComplexidadeRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalDispositivoComplexidade>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalDispositivoComplexidade[], number]> {
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
    return await this.profissionalDispositivoComplexidadeRepository.findAndCount(options);
  }

  async save(
    profissionalDispositivoComplexidade: ProfissionalDispositivoComplexidade
  ): Promise<ProfissionalDispositivoComplexidade | undefined> {
    return await this.profissionalDispositivoComplexidadeRepository.save(profissionalDispositivoComplexidade);
  }

  async update(
    profissionalDispositivoComplexidade: ProfissionalDispositivoComplexidade
  ): Promise<ProfissionalDispositivoComplexidade | undefined> {
    return await this.save(profissionalDispositivoComplexidade);
  }

  async delete(
    profissionalDispositivoComplexidade: ProfissionalDispositivoComplexidade
  ): Promise<ProfissionalDispositivoComplexidade | undefined> {
    return await this.profissionalDispositivoComplexidadeRepository.remove(profissionalDispositivoComplexidade);
  }
}
