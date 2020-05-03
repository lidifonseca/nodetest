import { EntityRepository, Repository } from 'typeorm';
import EspecialidadeValor from '../domain/especialidade-valor.entity';

@EntityRepository(EspecialidadeValor)
export class EspecialidadeValorRepository extends Repository<EspecialidadeValor> {}
