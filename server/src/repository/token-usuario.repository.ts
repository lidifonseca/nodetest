import { EntityRepository, Repository } from 'typeorm';
import TokenUsuario from '../domain/token-usuario.entity';

@EntityRepository(TokenUsuario)
export class TokenUsuarioRepository extends Repository<TokenUsuario> {}
