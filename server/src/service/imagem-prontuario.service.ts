import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import ImagemProntuario from '../domain/imagem-prontuario.entity';
import { ImagemProntuarioRepository } from '../repository/imagem-prontuario.repository';

const relationshipNames = [];

@Injectable()
export class ImagemProntuarioService {
  logger = new Logger('ImagemProntuarioService');

  constructor(@InjectRepository(ImagemProntuarioRepository) private imagemProntuarioRepository: ImagemProntuarioRepository) {}

  async findById(id: string): Promise<ImagemProntuario | undefined> {
    const options = { relations: relationshipNames };
    return await this.imagemProntuarioRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<ImagemProntuario>): Promise<ImagemProntuario | undefined> {
    return await this.imagemProntuarioRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<ImagemProntuario>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[ImagemProntuario[], number]> {
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
    return await this.imagemProntuarioRepository.findAndCount(options);
  }

  async save(imagemProntuario: ImagemProntuario): Promise<ImagemProntuario | undefined> {
    return await this.imagemProntuarioRepository.save(imagemProntuario);
  }

  async update(imagemProntuario: ImagemProntuario): Promise<ImagemProntuario | undefined> {
    return await this.save(imagemProntuario);
  }

  async delete(imagemProntuario: ImagemProntuario): Promise<ImagemProntuario | undefined> {
    return await this.imagemProntuarioRepository.remove(imagemProntuario);
  }
}
