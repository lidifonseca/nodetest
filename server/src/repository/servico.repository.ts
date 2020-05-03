import { EntityRepository, Repository } from 'typeorm';
import Servico from '../domain/servico.entity';

@EntityRepository(Servico)
export class ServicoRepository extends Repository<Servico> {}
