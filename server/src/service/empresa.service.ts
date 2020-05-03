import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Empresa from '../domain/empresa.entity';
import { EmpresaRepository } from '../repository/empresa.repository';

const relationshipNames = [];
relationshipNames.push('idCidade');

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
          where += ' `Empresa`.`' + element['column'] + '` like "%' + element['value'] + '%" ';
        } else if (element['operation'] === 'equals') {
          where += ' `Empresa`.`' + element['column'] + '` = "' + element['value'] + '" ';
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
