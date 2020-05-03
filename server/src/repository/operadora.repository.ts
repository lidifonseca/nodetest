import { EntityRepository, Repository } from 'typeorm';
import Operadora from '../domain/operadora.entity';

@EntityRepository(Operadora)
export class OperadoraRepository extends Repository<Operadora> {}
