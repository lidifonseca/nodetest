import { EntityRepository, Repository } from 'typeorm';
import UsuarioAcao from '../domain/usuario-acao.entity';

@EntityRepository(UsuarioAcao)
export class UsuarioAcaoRepository extends Repository<UsuarioAcao> {}
