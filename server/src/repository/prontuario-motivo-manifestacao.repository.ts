import { EntityRepository, Repository } from 'typeorm';
import ProntuarioMotivoManifestacao from '../domain/prontuario-motivo-manifestacao.entity';

@EntityRepository(ProntuarioMotivoManifestacao)
export class ProntuarioMotivoManifestacaoRepository extends Repository<ProntuarioMotivoManifestacao> {}
