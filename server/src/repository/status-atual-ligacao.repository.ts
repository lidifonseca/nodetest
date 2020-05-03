import { EntityRepository, Repository } from 'typeorm';
import StatusAtualLigacao from '../domain/status-atual-ligacao.entity';

@EntityRepository(StatusAtualLigacao)
export class StatusAtualLigacaoRepository extends Repository<StatusAtualLigacao> {}
