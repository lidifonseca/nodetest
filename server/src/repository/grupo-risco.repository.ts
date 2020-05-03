import { EntityRepository, Repository } from 'typeorm';
import GrupoRisco from '../domain/grupo-risco.entity';

@EntityRepository(GrupoRisco)
export class GrupoRiscoRepository extends Repository<GrupoRisco> {}
