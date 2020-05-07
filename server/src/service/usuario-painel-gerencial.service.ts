import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import UsuarioPainelGerencial from '../domain/usuario-painel-gerencial.entity';
import { UsuarioPainelGerencialRepository } from '../repository/usuario-painel-gerencial.repository';

const relationshipNames = [];

@Injectable()
export class UsuarioPainelGerencialService {
  logger = new Logger('UsuarioPainelGerencialService');

  constructor(
    @InjectRepository(UsuarioPainelGerencialRepository) private usuarioPainelGerencialRepository: UsuarioPainelGerencialRepository
  ) {}

  async findById(id: string): Promise<UsuarioPainelGerencial | undefined> {
    const options = { relations: relationshipNames };
    return await this.usuarioPainelGerencialRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<UsuarioPainelGerencial>): Promise<UsuarioPainelGerencial | undefined> {
    return await this.usuarioPainelGerencialRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<UsuarioPainelGerencial>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[UsuarioPainelGerencial[], number]> {
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
    return await this.usuarioPainelGerencialRepository.findAndCount(options);
  }

  async save(usuarioPainelGerencial: UsuarioPainelGerencial): Promise<UsuarioPainelGerencial | undefined> {
    return await this.usuarioPainelGerencialRepository.save(usuarioPainelGerencial);
  }

  async update(usuarioPainelGerencial: UsuarioPainelGerencial): Promise<UsuarioPainelGerencial | undefined> {
    return await this.save(usuarioPainelGerencial);
  }

  async delete(usuarioPainelGerencial: UsuarioPainelGerencial): Promise<UsuarioPainelGerencial | undefined> {
    return await this.usuarioPainelGerencialRepository.remove(usuarioPainelGerencial);
  }
}
