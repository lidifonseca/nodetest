import { EntityRepository, Repository } from 'typeorm';
import AtendimentoImagem from '../domain/atendimento-imagem.entity';

@EntityRepository(AtendimentoImagem)
export class AtendimentoImagemRepository extends Repository<AtendimentoImagem> {}
