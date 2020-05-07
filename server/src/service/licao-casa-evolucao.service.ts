import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import LicaoCasaEvolucao from '../domain/licao-casa-evolucao.entity';
import { LicaoCasaEvolucaoRepository } from '../repository/licao-casa-evolucao.repository';

const relationshipNames = [];

@Injectable()
export class LicaoCasaEvolucaoService {
  logger = new Logger('LicaoCasaEvolucaoService');

  constructor(@InjectRepository(LicaoCasaEvolucaoRepository) private licaoCasaEvolucaoRepository: LicaoCasaEvolucaoRepository) {}

  async findById(id: string): Promise<LicaoCasaEvolucao | undefined> {
    const options = { relations: relationshipNames };
    return await this.licaoCasaEvolucaoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<LicaoCasaEvolucao>): Promise<LicaoCasaEvolucao | undefined> {
    return await this.licaoCasaEvolucaoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<LicaoCasaEvolucao>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[LicaoCasaEvolucao[], number]> {
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
    return await this.licaoCasaEvolucaoRepository.findAndCount(options);
  }

  async save(licaoCasaEvolucao: LicaoCasaEvolucao): Promise<LicaoCasaEvolucao | undefined> {
    return await this.licaoCasaEvolucaoRepository.save(licaoCasaEvolucao);
  }

  async update(licaoCasaEvolucao: LicaoCasaEvolucao): Promise<LicaoCasaEvolucao | undefined> {
    return await this.save(licaoCasaEvolucao);
  }

  async delete(licaoCasaEvolucao: LicaoCasaEvolucao): Promise<LicaoCasaEvolucao | undefined> {
    return await this.licaoCasaEvolucaoRepository.remove(licaoCasaEvolucao);
  }
}
