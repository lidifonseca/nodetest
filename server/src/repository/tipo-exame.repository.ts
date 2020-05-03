import { EntityRepository, Repository } from 'typeorm';
import TipoExame from '../domain/tipo-exame.entity';

@EntityRepository(TipoExame)
export class TipoExameRepository extends Repository<TipoExame> {}
