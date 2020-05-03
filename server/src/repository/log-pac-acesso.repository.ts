import { EntityRepository, Repository } from 'typeorm';
import LogPacAcesso from '../domain/log-pac-acesso.entity';

@EntityRepository(LogPacAcesso)
export class LogPacAcessoRepository extends Repository<LogPacAcesso> {}
