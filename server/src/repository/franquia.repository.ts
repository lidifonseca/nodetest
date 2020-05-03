import { EntityRepository, Repository } from 'typeorm';
import Franquia from '../domain/franquia.entity';

@EntityRepository(Franquia)
export class FranquiaRepository extends Repository<Franquia> {}
