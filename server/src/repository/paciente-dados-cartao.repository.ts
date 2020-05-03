import { EntityRepository, Repository } from 'typeorm';
import PacienteDadosCartao from '../domain/paciente-dados-cartao.entity';

@EntityRepository(PacienteDadosCartao)
export class PacienteDadosCartaoRepository extends Repository<PacienteDadosCartao> {}
