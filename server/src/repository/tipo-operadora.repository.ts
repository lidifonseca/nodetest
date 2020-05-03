import { EntityRepository, Repository } from 'typeorm';
import TipoOperadora from '../domain/tipo-operadora.entity';

@EntityRepository(TipoOperadora)
export class TipoOperadoraRepository extends Repository<TipoOperadora> {}
