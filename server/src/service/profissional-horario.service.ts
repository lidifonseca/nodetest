import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ProfissionalHorario from '../domain/profissional-horario.entity';
import { ProfissionalHorarioRepository } from '../repository/profissional-horario.repository';

const relationshipNames = [];

@Injectable()
export class ProfissionalHorarioService {
  logger = new Logger('ProfissionalHorarioService');

  constructor(@InjectRepository(ProfissionalHorarioRepository) private profissionalHorarioRepository: ProfissionalHorarioRepository) {}

  async findById(id: string): Promise<ProfissionalHorario | undefined> {
    const options = { relations: relationshipNames };
    return await this.profissionalHorarioRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ProfissionalHorario>): Promise<ProfissionalHorario | undefined> {
    return await this.profissionalHorarioRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ProfissionalHorario>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ProfissionalHorario[], number]> {
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
    return await this.profissionalHorarioRepository.findAndCount(options);
  }

  async save(profissionalHorario: ProfissionalHorario): Promise<ProfissionalHorario | undefined> {
    return await this.profissionalHorarioRepository.save(profissionalHorario);
  }

  async update(profissionalHorario: ProfissionalHorario): Promise<ProfissionalHorario | undefined> {
    return await this.save(profissionalHorario);
  }

  async delete(profissionalHorario: ProfissionalHorario): Promise<ProfissionalHorario | undefined> {
    return await this.profissionalHorarioRepository.remove(profissionalHorario);
  }
}
