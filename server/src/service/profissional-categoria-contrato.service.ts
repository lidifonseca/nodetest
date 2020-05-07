import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ProfissionalCategoriaContrato from '../domain/profissional-categoria-contrato.entity';
import { ProfissionalCategoriaContratoRepository } from '../repository/profissional-categoria-contrato.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalCategoriaContratoService {
  logger = new Logger('ProfissionalCategoriaContratoService');

  constructor(
    @InjectRepository(ProfissionalCategoriaContratoRepository)
    private profissionalCategoriaContratoRepository: ProfissionalCategoriaContratoRepository
  ) {}

  async findById(id: string): Promise<ProfissionalCategoriaContrato | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalCategoriaContratoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProfissionalCategoriaContrato>): Promise<ProfissionalCategoriaContrato | undefined> {
    return await this.profissionalCategoriaContratoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalCategoriaContrato>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalCategoriaContrato[], number]> {
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
    return await this.profissionalCategoriaContratoRepository.findAndCount(options);
  }

  async save(profissionalCategoriaContrato: ProfissionalCategoriaContrato): Promise<ProfissionalCategoriaContrato | undefined> {
    return await this.profissionalCategoriaContratoRepository.save(profissionalCategoriaContrato);
  }

  async update(profissionalCategoriaContrato: ProfissionalCategoriaContrato): Promise<ProfissionalCategoriaContrato | undefined> {
    return await this.save(profissionalCategoriaContrato);
  }

  async delete(profissionalCategoriaContrato: ProfissionalCategoriaContrato): Promise<ProfissionalCategoriaContrato | undefined> {
    return await this.profissionalCategoriaContratoRepository.remove(profissionalCategoriaContrato);
  }
}
