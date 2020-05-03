import { EntityRepository, Repository } from 'typeorm';
import UnidadeEasyAreaAtuacao from '../domain/unidade-easy-area-atuacao.entity';

@EntityRepository(UnidadeEasyAreaAtuacao)
export class UnidadeEasyAreaAtuacaoRepository extends Repository<UnidadeEasyAreaAtuacao> {}
