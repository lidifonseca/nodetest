import { AvForm } from 'availity-reactstrap-validation';
import { IPaginationBaseState } from 'react-jhipster/src/component/pagination/pagination-utils';

export interface IProcessoBaseState {
  activeTab?: string;
  comarca?: string;
  numeroProcesso?: string;
  advogados?: string;
  pesquisa?: number;
  assunto?: string;
  distribuicaoInicial?: Date;
  distribuicaoFinal?: Date;
  myFormRef?: AvForm;
  estado?: string;
  valorInicial?: number;
  valorFinal?: number;
  moeda?: string;
  cnpj?: string;
}
export interface IProcessoBaseStateDetails {
  offset?: number;
  pesquisa?: number;
  valorInicial?: number;
  valorFinal?: number;
}

export const getProcessoState = (location): IProcessoBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const activeTabParam = url.searchParams.get('activeTab') || '';

  const comarcaParam = url.searchParams.get('comarca') || '';
  const numeroProcessoParam = url.searchParams.get('numeroProcesso') || '';
  const advogadosParam = url.searchParams.get('advogados') || '';
  const pesquisaParam = parseInt(url.searchParams.get('pesquisa')) || undefined;
  const assuntoParam = url.searchParams.get('assunto') || '';
  const distribuicaoInicialParam = url.searchParams.get('distribuicao_inicial') || '';
  const distribuicaoFinalParam = url.searchParams.get('distribuicao_final') || '';
  const valorInicialParam = parseFloat(url.searchParams.get('valorInicial')) || null;
  const valorFinalParam = parseFloat(url.searchParams.get('valorFinal')) || null;
  const moedaParam = url.searchParams.get('moeda') || '';
  const cnpjParam = url.searchParams.get('cnpj') || '';

  let advogados = null;
  const activeTab = activeTabParam ? activeTabParam : 'sem_clasificacao';
  const pesquisa = pesquisaParam;
  const comarca = comarcaParam;
  const numeroProcesso = numeroProcessoParam;
  const assunto = assuntoParam;
  const distribuicaoInicial = distribuicaoInicialParam ? new Date(distribuicaoInicialParam) : null;
  const distribuicaoFinal = distribuicaoInicialParam ? new Date(distribuicaoFinalParam) : null;
  const valorInicial = valorInicialParam ? valorInicialParam : null;
  const valorFinal = valorFinalParam ? valorFinalParam : null;
  const moeda = moedaParam;
  const cnpj = cnpjParam;

  if (advogadosParam === '0') advogados = '0';
  if (advogadosParam === '1') advogados = '1';

  return {
    activeTab,
    comarca,
    numeroProcesso,
    advogados,
    pesquisa,
    assunto,
    distribuicaoInicial,
    distribuicaoFinal,
    valorInicial,
    valorFinal,
    moeda,
    cnpj
  };
};
export const getProcessoStateDetails = (location): IProcessoBaseStateDetails => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
  const pesquisa = parseInt(url.searchParams.get('pesquisa')) || null;
  const offset = parseInt(url.searchParams.get('offset')) || 0;
  console.info(offset);
  return { pesquisa, offset };
};

export const getSortState = (location, itemsPerPage): IPaginationBaseState => {
  const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing

  const pageParam = url.searchParams.get('page');
  const sortParam = url.searchParams.get('sort');

  let sort = 'dataCriacao';
  let order = 'desc';
  let activePage = 1;
  if (pageParam !== '' && !isNaN(parseInt(pageParam, 10))) {
    activePage = parseInt(pageParam, 10);
  }
  if (sortParam) {
    sort = sortParam.split(',')[0];
    order = sortParam.split(',')[1];
  }
  return { itemsPerPage, sort, order, activePage };
};
