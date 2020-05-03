import { EntityRepository, Repository } from 'typeorm';
import CategoriaContrato from '../domain/categoria-contrato.entity';

@EntityRepository(CategoriaContrato)
export class CategoriaContratoRepository extends Repository<CategoriaContrato> {}
