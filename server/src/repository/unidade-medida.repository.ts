import { EntityRepository, Repository } from 'typeorm';
import UnidadeMedida from '../domain/unidade-medida.entity';

@EntityRepository(UnidadeMedida)
export class UnidadeMedidaRepository extends Repository<UnidadeMedida> {}
