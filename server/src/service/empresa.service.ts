import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import Empresa from '../domain/empresa.entity';
import { EmpresaRepository } from '../repository/empresa.repository';

const relationshipNames = [];
relationshipNames.push('cidade');

@Injectable()
export class EmpresaService {
  logger = new Logger('EmpresaService');

  constructor(@InjectRepository(EmpresaRepository) private empresaRepository: EmpresaRepository) {}

  async findById(id: string): Promise<Empresa | undefined> {
    const options = { relations: relationshipNames };
    return await this.empresaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Empresa>): Promise<Empresa | undefined> {
    return await this.empresaRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<Empresa>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[Empresa[], number]> {
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
    return await this.empresaRepository.findAndCount(options);
  }

  async save(empresa: Empresa): Promise<Empresa | undefined> {
    return await this.empresaRepository.save(empresa);
  }

  async update(empresa: Empresa): Promise<Empresa | undefined> {
    return await this.save(empresa);
  }

  async delete(empresa: Empresa): Promise<Empresa | undefined> {
    return await this.empresaRepository.remove(empresa);
  }
}
