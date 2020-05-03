import { EntityRepository, Repository } from 'typeorm';
import Periodo from '../domain/periodo.entity';

@EntityRepository(Periodo)
export class PeriodoRepository extends Repository<Periodo> {}
