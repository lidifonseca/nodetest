import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ProntuarioTipoManifestacao from '../domain/prontuario-tipo-manifestacao.entity';
import { ProntuarioTipoManifestacaoRepository } from '../repository/prontuario-tipo-manifestacao.repository';

const relationshipNames = [];

@Injectable()
export class ProntuarioTipoManifestacaoService {
  logger = new Logger('ProntuarioTipoManifestacaoService');

  constructor(
    @InjectRepository(ProntuarioTipoManifestacaoRepository)
    private prontuarioTipoManifestacaoRepository: ProntuarioTipoManifestacaoRepository
  ) {}

  async findById(id: string): Promise<ProntuarioTipoManifestacao | undefined> {
    const options = { relations: relationshipNames };
    return await this.prontuarioTipoManifestacaoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProntuarioTipoManifestacao>): Promise<ProntuarioTipoManifestacao | undefined> {
    return await this.prontuarioTipoManifestacaoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProntuarioTipoManifestacao>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProntuarioTipoManifestacao[], number]> {
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
    return await this.prontuarioTipoManifestacaoRepository.findAndCount(options);
  }

  async save(prontuarioTipoManifestacao: ProntuarioTipoManifestacao): Promise<ProntuarioTipoManifestacao | undefined> {
    return await this.prontuarioTipoManifestacaoRepository.save(prontuarioTipoManifestacao);
  }

  async update(prontuarioTipoManifestacao: ProntuarioTipoManifestacao): Promise<ProntuarioTipoManifestacao | undefined> {
    return await this.save(prontuarioTipoManifestacao);
  }

  async delete(prontuarioTipoManifestacao: ProntuarioTipoManifestacao): Promise<ProntuarioTipoManifestacao | undefined> {
    return await this.prontuarioTipoManifestacaoRepository.remove(prontuarioTipoManifestacao);
  }
}
