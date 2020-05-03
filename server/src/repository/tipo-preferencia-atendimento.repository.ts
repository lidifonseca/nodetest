import { EntityRepository, Repository } from 'typeorm';
import TipoPreferenciaAtendimento from '../domain/tipo-preferencia-atendimento.entity';

@EntityRepository(TipoPreferenciaAtendimento)
export class TipoPreferenciaAtendimentoRepository extends Repository<TipoPreferenciaAtendimento> {}
