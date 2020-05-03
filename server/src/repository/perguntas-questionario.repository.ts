import { EntityRepository, Repository } from 'typeorm';
import PerguntasQuestionario from '../domain/perguntas-questionario.entity';

@EntityRepository(PerguntasQuestionario)
export class PerguntasQuestionarioRepository extends Repository<PerguntasQuestionario> {}
