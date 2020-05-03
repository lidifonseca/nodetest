import { EntityRepository, Repository } from 'typeorm';
import NotificacaoConfigUsuario from '../domain/notificacao-config-usuario.entity';

@EntityRepository(NotificacaoConfigUsuario)
export class NotificacaoConfigUsuarioRepository extends Repository<NotificacaoConfigUsuario> {}
