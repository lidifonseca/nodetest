import { EntityRepository, Repository } from 'typeorm';
import TipoProntuario from '../domain/tipo-prontuario.entity';

@EntityRepository(TipoProntuario)
export class TipoProntuarioRepository extends Repository<TipoProntuario> {}
