import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import SegmentosPerguntas from '../domain/segmentos-perguntas.entity';
import { SegmentosPerguntasRepository } from '../repository/segmentos-perguntas.repository';

const relationshipNames = [];

@Injectable()
export class SegmentosPerguntasService {
  logger = new Logger('SegmentosPerguntasService');

  constructor(@InjectRepository(SegmentosPerguntasRepository) private segmentosPerguntasRepository: SegmentosPerguntasRepository) {}

  async findById(id: string): Promise<SegmentosPerguntas | undefined> {
    const options = { relations: relationshipNames };
    return await this.segmentosPerguntasRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<SegmentosPerguntas>): Promise<SegmentosPerguntas | undefined> {
    return await this.segmentosPerguntasRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<SegmentosPerguntas>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[SegmentosPerguntas[], number]> {
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
    return await this.segmentosPerguntasRepository.findAndCount(options);
  }

  async save(segmentosPerguntas: SegmentosPerguntas): Promise<SegmentosPerguntas | undefined> {
    return await this.segmentosPerguntasRepository.save(segmentosPerguntas);
  }

  async update(segmentosPerguntas: SegmentosPerguntas): Promise<SegmentosPerguntas | undefined> {
    return await this.save(segmentosPerguntas);
  }

  async delete(segmentosPerguntas: SegmentosPerguntas): Promise<SegmentosPerguntas | undefined> {
    return await this.segmentosPerguntasRepository.remove(segmentosPerguntas);
  }
}
