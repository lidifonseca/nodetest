import { EntityRepository, Repository } from 'typeorm';
import TermosUso from '../domain/termos-uso.entity';

@EntityRepository(TermosUso)
export class TermosUsoRepository extends Repository<TermosUso> {}
