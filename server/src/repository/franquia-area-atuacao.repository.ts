import { EntityRepository, Repository } from 'typeorm';
import FranquiaAreaAtuacao from '../domain/franquia-area-atuacao.entity';

@EntityRepository(FranquiaAreaAtuacao)
export class FranquiaAreaAtuacaoRepository extends Repository<FranquiaAreaAtuacao> {}
