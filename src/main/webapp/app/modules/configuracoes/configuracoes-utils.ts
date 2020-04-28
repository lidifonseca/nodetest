export interface IConfiguracoesBaseState {
  nome: string;
  comarca: string;
  estado: string;
  anoInicial?: number;
  anoFinal?: number;
  selecionarProcessosCom?: any;
  descartarProcessosCom?: any;
  classe?: any;
  observacoes?: string;
  incluirMovimentacoesAll: boolean;
  comarcaPorComarca: boolean;
}

export const getConfiguracoesState = (location): IConfiguracoesBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing

  const nomeParam = url.searchParams.get('nome') || '';
  const comarcaParam = url.searchParams.get('comarcaTjId') || '-1';
  const estadoParam = url.searchParams.get('estado') || '';
  const anoInicialParam = url.searchParams.get('anoInicial') || '';
  const anoFinalParam = url.searchParams.get('anoFinal') || '';
  const selecionarProcessosComParam = url.searchParams.get('incluirMovimentacoes') || '';
  const descartarProcessosComParam = url.searchParams.get('descartarMovimentacoes') || '';
  const classeParam = url.searchParams.get('classesIncluir') || '';
  const incluirMovimentacoesAll = url.searchParams.get('incluirMovimentacoesAll') === 'true';
  const comarcaPorComarca = url.searchParams.get('comarcaPorComarca') === 'true';

  const nome = nomeParam;
  const comarca = comarcaParam;
  const estado = estadoParam;
  const anoInicial = parseInt(anoInicialParam, 10);
  const anoFinal = parseInt(anoFinalParam, 10);

  const selecionarProcessosCom = [];
  const descartarProcessosCom = [];
  const classe = [];

  if (classeParam !== '') {
    JSON.parse(classeParam).map((value, i) => classe.push(value));
  }

  if (selecionarProcessosComParam !== '') {
    JSON.parse(selecionarProcessosComParam).map((value, i) => selecionarProcessosCom.push(value));
  }

  if (descartarProcessosComParam !== '') {
    JSON.parse(descartarProcessosComParam).map((value, i) => descartarProcessosCom.push(value));
  }

  return {
    nome,
    comarca,
    anoInicial,
    anoFinal,
    selecionarProcessosCom,
    descartarProcessosCom,
    classe,
    estado,
    incluirMovimentacoesAll,
    comarcaPorComarca
  };
};
