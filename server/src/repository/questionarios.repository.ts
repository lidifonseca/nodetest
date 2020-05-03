import { EntityRepository, Repository } from 'typeorm';
import Questionarios from '../domain/questionarios.entity';

@EntityRepository(Questionarios)
export class QuestionariosRepository extends Repository<Questionarios> {}
