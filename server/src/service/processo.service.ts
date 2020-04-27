import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Processo from '../domain/processo.entity';
import { ProcessoRepository } from '../repository/processo.repository';

const relationshipNames = [];
relationshipNames.push('comarca');

@Injectable()
export class ProcessoService {
  logger = new Logger('ProcessoService');

  constructor(@InjectRepository(ProcessoRepository) private processoRepository: ProcessoRepository) {}

  async findById(id: string): Promise<Processo | undefined> {
    const options = { relations: relationshipNames };
    return await this.processoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Processo>): Promise<Processo | undefined> {
    return await this.processoRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Processo>): Promise<[Processo[], number]> {
    options.relations = relationshipNames;
    return await this.processoRepository.findAndCount(options);
  }

  async save(processo: Processo): Promise<Processo | undefined> {
    return await this.processoRepository.save(processo);
  }

  async update(processo: Processo): Promise<Processo | undefined> {
    return await this.save(processo);
  }

  async delete(processo: Processo): Promise<Processo | undefined> {
    return await this.processoRepository.remove(processo);
  }
}
