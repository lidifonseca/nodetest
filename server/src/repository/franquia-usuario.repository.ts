import { EntityRepository, Repository } from 'typeorm';
import FranquiaUsuario from '../domain/franquia-usuario.entity';

@EntityRepository(FranquiaUsuario)
export class FranquiaUsuarioRepository extends Repository<FranquiaUsuario> {}
