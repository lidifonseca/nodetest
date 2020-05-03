import { EntityRepository, Repository } from 'typeorm';
import ProfissionalCategoriaContrato from '../domain/profissional-categoria-contrato.entity';

@EntityRepository(ProfissionalCategoriaContrato)
export class ProfissionalCategoriaContratoRepository extends Repository<ProfissionalCategoriaContrato> {}
