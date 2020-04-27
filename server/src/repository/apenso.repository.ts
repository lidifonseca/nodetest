import { EntityRepository, Repository } from 'typeorm';
import Apenso from '../domain/apenso.entity';

@EntityRepository(Apenso)
export class ApensoRepository extends Repository<Apenso> {}
