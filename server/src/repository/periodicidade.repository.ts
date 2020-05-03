import { EntityRepository, Repository } from 'typeorm';
import Periodicidade from '../domain/periodicidade.entity';

@EntityRepository(Periodicidade)
export class PeriodicidadeRepository extends Repository<Periodicidade> {}
