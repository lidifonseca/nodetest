import { EntityRepository, Repository } from 'typeorm';
import UsuarioStatusAtual from '../domain/usuario-status-atual.entity';

@EntityRepository(UsuarioStatusAtual)
export class UsuarioStatusAtualRepository extends Repository<UsuarioStatusAtual> {}
