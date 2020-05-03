import { EntityRepository, Repository } from 'typeorm';
import EspecialidadeOperadora from '../domain/especialidade-operadora.entity';

@EntityRepository(EspecialidadeOperadora)
export class EspecialidadeOperadoraRepository extends Repository<EspecialidadeOperadora> {}
