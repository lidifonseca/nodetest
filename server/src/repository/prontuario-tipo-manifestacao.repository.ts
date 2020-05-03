import { EntityRepository, Repository } from 'typeorm';
import ProntuarioTipoManifestacao from '../domain/prontuario-tipo-manifestacao.entity';

@EntityRepository(ProntuarioTipoManifestacao)
export class ProntuarioTipoManifestacaoRepository extends Repository<ProntuarioTipoManifestacao> {}
