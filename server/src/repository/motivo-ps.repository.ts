import { EntityRepository, Repository } from 'typeorm';
import MotivoPs from '../domain/motivo-ps.entity';

@EntityRepository(MotivoPs)
export class MotivoPsRepository extends Repository<MotivoPs> {}
