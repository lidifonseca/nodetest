import { EntityRepository, Repository } from 'typeorm';
import FilesPanico from '../domain/files-panico.entity';

@EntityRepository(FilesPanico)
export class FilesPanicoRepository extends Repository<FilesPanico> {}
