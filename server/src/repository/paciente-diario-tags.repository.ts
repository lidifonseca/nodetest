import { EntityRepository, Repository } from 'typeorm';
import PacienteDiarioTags from '../domain/paciente-diario-tags.entity';

@EntityRepository(PacienteDiarioTags)
export class PacienteDiarioTagsRepository extends Repository<PacienteDiarioTags> {}
