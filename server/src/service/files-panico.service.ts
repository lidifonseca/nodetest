import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, FindOneOptions, Like, Equal } from 'typeorm';
import FilesPanico from '../domain/files-panico.entity';
import { FilesPanicoRepository } from '../repository/files-panico.repository';

const relationshipNames = [];

@Injectable()
export class FilesPanicoService {
  logger = new Logger('FilesPanicoService');

  constructor(@InjectRepository(FilesPanicoRepository) private filesPanicoRepository: FilesPanicoRepository) {}

  async findById(id: string): Promise<FilesPanico | undefined> {
    const options = { relations: relationshipNames };
    return await this.filesPanicoRepository.findOne(id, options);
  }

  async findByfields(options: FindOneOptions<FilesPanico>): Promise<FilesPanico | undefined> {
    return await this.filesPanicoRepository.findOne(options);
  }

  async findAndCount(
    options: FindManyOptions<FilesPanico>,
    filters?: Array<{ column: string; value: string; operation: string }>[]
  ): Promise<[FilesPanico[], number]> {
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
    return await this.filesPanicoRepository.findAndCount(options);
  }

  async save(filesPanico: FilesPanico): Promise<FilesPanico | undefined> {
    return await this.filesPanicoRepository.save(filesPanico);
  }

  async update(filesPanico: FilesPanico): Promise<FilesPanico | undefined> {
    return await this.save(filesPanico);
  }

  async delete(filesPanico: FilesPanico): Promise<FilesPanico | undefined> {
    return await this.filesPanicoRepository.remove(filesPanico);
  }
}
