import { EntityRepository, Repository } from 'typeorm';
import NotificacaoConfig from '../domain/notificacao-config.entity';

@EntityRepository(NotificacaoConfig)
export class NotificacaoConfigRepository extends Repository<NotificacaoConfig> {}
