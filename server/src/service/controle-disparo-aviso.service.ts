import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ControleDisparoAviso from '../domain/controle-disparo-aviso.entity';
import { ControleDisparoAvisoRepository } from '../repository/controle-disparo-aviso.repository';

const relationshipNames = [];

@Injectable()
export class ControleDisparoAvisoService {
  logger = new Logger('ControleDisparoAvisoService');

  constructor(@InjectRepository(ControleDisparoAvisoRepository) private controleDisparoAvisoRepository: ControleDisparoAvisoRepository) {}

  async findById(id: string): Promise<ControleDisparoAviso | undefined> {
    const options = { relations: relationshipNames };
    return await this.controleDisparoAvisoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ControleDisparoAviso>): Promise<ControleDisparoAviso | undefined> {
    return await this.controleDisparoAvisoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ControleDisparoAviso>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ControleDisparoAviso[], number]> {
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
    return await this.controleDisparoAvisoRepository.findAndCount(options);
  }

  async save(controleDisparoAviso: ControleDisparoAviso): Promise<ControleDisparoAviso | undefined> {
    return await this.controleDisparoAvisoRepository.save(controleDisparoAviso);
  }

  async update(controleDisparoAviso: ControleDisparoAviso): Promise<ControleDisparoAviso | undefined> {
    return await this.save(controleDisparoAviso);
  }

  async delete(controleDisparoAviso: ControleDisparoAviso): Promise<ControleDisparoAviso | undefined> {
    return await this.controleDisparoAvisoRepository.remove(controleDisparoAviso);
  }
}
