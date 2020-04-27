import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './pesquisa.reducer';
import { IPesquisa } from 'app/shared/model/pesquisa.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPesquisaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Pesquisa = (props: IPesquisaProps) => {
  const [paginationState, setPaginationState] = useState(getSortState(props.location, ITEMS_PER_PAGE));

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    props.history.push(
      `${props.location.pathname}?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`
    );
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage
    });

  const { pesquisaList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="pesquisa-heading">
        Pesquisas
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Pesquisa
        </Link>
      </h2>
      <div className="table-responsive">
        {pesquisaList && pesquisaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('nome')}>
                  Nome <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('classesIncluir')}>
                  Classes Incluir <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('incluirMovimentacoes')}>
                  Incluir Movimentacoes <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('descartarMovimentacoes')}>
                  Descartar Movimentacoes <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('incluirMovimentacoesAll')}>
                  Incluir Movimentacoes All <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('anoInicial')}>
                  Ano Inicial <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('anoFinal')}>
                  Ano Final <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('csv')}>
                  Csv <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataCriacao')}>
                  Data Criacao <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataFinalizacao')}>
                  Data Finalizacao <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('situacao')}>
                  Situacao <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('observacoes')}>
                  Observacoes <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('csvTotal')}>
                  Csv Total <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('csvVerificados')}>
                  Csv Verificados <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('comarcaPorComarca')}>
                  Comarca Por Comarca <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  User <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Comarcas <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Estado <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pesquisaList.map((pesquisa, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${pesquisa.id}`} color="link" size="sm">
                      {pesquisa.id}
                    </Button>
                  </td>
                  <td>{pesquisa.nome}</td>
                  <td>{pesquisa.classesIncluir}</td>
                  <td>{pesquisa.incluirMovimentacoes}</td>
                  <td>{pesquisa.descartarMovimentacoes}</td>
                  <td>{pesquisa.incluirMovimentacoesAll ? 'true' : 'false'}</td>
                  <td>{pesquisa.anoInicial}</td>
                  <td>{pesquisa.anoFinal}</td>
                  <td>{pesquisa.csv}</td>
                  <td>
                    <TextFormat type="date" value={pesquisa.dataCriacao} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={pesquisa.dataFinalizacao} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{pesquisa.situacao}</td>
                  <td>{pesquisa.observacoes}</td>
                  <td>{pesquisa.csvTotal}</td>
                  <td>{pesquisa.csvVerificados}</td>
                  <td>{pesquisa.comarcaPorComarca ? 'true' : 'false'}</td>
                  <td>{pesquisa.userId ? pesquisa.userId : ''}</td>
                  <td>{pesquisa.comarcasId ? <Link to={`comarca/${pesquisa.comarcasId}`}>{pesquisa.comarcasId}</Link> : ''}</td>
                  <td>{pesquisa.estadoId ? <Link to={`estado/${pesquisa.estadoId}`}>{pesquisa.estadoId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${pesquisa.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${pesquisa.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${pesquisa.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Pesquisas found</div>
        )}
      </div>
      <div className={pesquisaList && pesquisaList.length > 0 ? '' : 'd-none'}>
        <Row className="justify-content-center">
          <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
        </Row>
        <Row className="justify-content-center">
          <JhiPagination
            activePage={paginationState.activePage}
            onSelect={handlePagination}
            maxButtons={5}
            itemsPerPage={paginationState.itemsPerPage}
            totalItems={props.totalItems}
          />
        </Row>
      </div>
    </div>
  );
};

const mapStateToProps = ({ pesquisa }: IRootState) => ({
  pesquisaList: pesquisa.entities,
  loading: pesquisa.loading,
  totalItems: pesquisa.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Pesquisa);
