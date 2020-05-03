import { EntityRepository, Repository } from 'typeorm';
import PacienteArquivo from '../domain/paciente-arquivo.entity';

@EntityRepository(PacienteArquivo)
export class PacienteArquivoRepository extends Repository<PacienteArquivo> {}
