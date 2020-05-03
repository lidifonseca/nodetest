import { EntityRepository, Repository } from 'typeorm';
import VwApiAtendimentosAceite from '../domain/vw-api-atendimentos-aceite.entity';

@EntityRepository(VwApiAtendimentosAceite)
export class VwApiAtendimentosAceiteRepository extends Repository<VwApiAtendimentosAceite> {}
