import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ProntuarioMotivoManifestacao from '../domain/prontuario-motivo-manifestacao.entity';
import { ProntuarioMotivoManifestacaoRepository } from '../repository/prontuario-motivo-manifestacao.repository';

const relationshipNames = [];

@Injectable()
export class ProntuarioMotivoManifestacaoService {
  logger = new Logger('ProntuarioMotivoManifestacaoService');

  constructor(
    @InjectRepository(ProntuarioMotivoManifestacaoRepository)
    private prontuarioMotivoManifestacaoRepository: ProntuarioMotivoManifestacaoRepository
  ) {}

  async findById(id: string): Promise<ProntuarioMotivoManifestacao | undefined> {
    const options = { relations: relationshipNames };
    return await this.prontuarioMotivoManifestacaoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProntuarioMotivoManifestacao>): Promise<ProntuarioMotivoManifestacao | undefined> {
    return await this.prontuarioMotivoManifestacaoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProntuarioMotivoManifestacao>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProntuarioMotivoManifestacao[], number]> {
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
    return await this.prontuarioMotivoManifestacaoRepository.findAndCount(options);
  }

  async save(prontuarioMotivoManifestacao: ProntuarioMotivoManifestacao): Promise<ProntuarioMotivoManifestacao | undefined> {
    return await this.prontuarioMotivoManifestacaoRepository.save(prontuarioMotivoManifestacao);
  }

  async update(prontuarioMotivoManifestacao: ProntuarioMotivoManifestacao): Promise<ProntuarioMotivoManifestacao | undefined> {
    return await this.save(prontuarioMotivoManifestacao);
  }

  async delete(prontuarioMotivoManifestacao: ProntuarioMotivoManifestacao): Promise<ProntuarioMotivoManifestacao | undefined> {
    return await this.prontuarioMotivoManifestacaoRepository.remove(prontuarioMotivoManifestacao);
  }
}
