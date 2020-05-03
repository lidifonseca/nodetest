import { EntityRepository, Repository } from 'typeorm';
import Especialidade from '../domain/especialidade.entity';

@EntityRepository(Especialidade)
export class EspecialidadeRepository extends Repository<Especialidade> {}
