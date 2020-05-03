import { EntityRepository, Repository } from 'typeorm';
import TipoUsuario from '../domain/tipo-usuario.entity';

@EntityRepository(TipoUsuario)
export class TipoUsuarioRepository extends Repository<TipoUsuario> {}
