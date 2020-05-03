import { EntityRepository, Repository } from 'typeorm';
import RespostasQuestionarios from '../domain/respostas-questionarios.entity';

@EntityRepository(RespostasQuestionarios)
export class RespostasQuestionariosRepository extends Repository<RespostasQuestionarios> {}
