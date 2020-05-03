import { EntityRepository, Repository } from 'typeorm';
import PushnotificationEnvios from '../domain/pushnotification-envios.entity';

@EntityRepository(PushnotificationEnvios)
export class PushnotificationEnviosRepository extends Repository<PushnotificationEnvios> {}
