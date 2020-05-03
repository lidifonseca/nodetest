import { EntityRepository, Repository } from 'typeorm';
import DiarioTags from '../domain/diario-tags.entity';

@EntityRepository(DiarioTags)
export class DiarioTagsRepository extends Repository<DiarioTags> {}
