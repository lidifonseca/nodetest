import { EntityRepository, Repository } from 'typeorm';
import ProfissionalAreaAtuacao from '../domain/profissional-area-atuacao.entity';

@EntityRepository(ProfissionalAreaAtuacao)
export class ProfissionalAreaAtuacaoRepository extends Repository<ProfissionalAreaAtuacao> {}
