import { EntityRepository, Repository } from 'typeorm';
import ProfissionalAreaAtuacaoNew from '../domain/profissional-area-atuacao-new.entity';

@EntityRepository(ProfissionalAreaAtuacaoNew)
export class ProfissionalAreaAtuacaoNewRepository extends Repository<ProfissionalAreaAtuacaoNew> {}
