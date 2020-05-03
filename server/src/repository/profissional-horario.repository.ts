import { EntityRepository, Repository } from 'typeorm';
import ProfissionalHorario from '../domain/profissional-horario.entity';

@EntityRepository(ProfissionalHorario)
export class ProfissionalHorarioRepository extends Repository<ProfissionalHorario> {}
