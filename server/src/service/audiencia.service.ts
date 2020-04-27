import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import Audiencia from '../domain/audiencia.entity';
import { AudienciaRepository } from '../repository/audiencia.repository';

const relationshipNames = [];
relationshipNames.push('processo');

@Injectable()
export class AudienciaService {
  logger = new Logger('AudienciaService');

  constructor(@InjectRepository(AudienciaRepository) private audienciaRepository: AudienciaRepository) {}

  async findById(id: string): Promise<Audiencia | undefined> {
    const options = { relations: relationshipNames };
    return await this.audienciaRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<Audiencia>): Promise<Audiencia | undefined> {
    return await this.audienciaRepository.findOne(options);
  }

  async findAndCount(options: FindManyOptions<Audiencia>): Promise<[Audiencia[], number]> {
    options.relations = relationshipNames;
    return await this.audienciaRepository.findAndCount(options);
  }

  async save(audiencia: Audiencia): Promise<Audiencia | undefined> {
    return await this.audienciaRepository.save(audiencia);
  }

  async update(audiencia: Audiencia): Promise<Audiencia | undefined> {
    return await this.save(audiencia);
  }

  async delete(audiencia: Audiencia): Promise<Audiencia | undefined> {
    return await this.audienciaRepository.remove(audiencia);
  }
}
