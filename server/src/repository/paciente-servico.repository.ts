import { EntityRepository, Repository } from 'typeorm';
import PacienteServico from '../domain/paciente-servico.entity';

@EntityRepository(PacienteServico)
export class PacienteServicoRepository extends Repository<PacienteServico> {}
