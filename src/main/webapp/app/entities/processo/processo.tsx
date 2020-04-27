import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { byteSize, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './processo.reducer';
import { IProcesso } from 'app/shared/model/processo.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProcessoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Processo = (props: IProcessoProps) => {
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

  const { processoList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="processo-heading">
        Processos
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Processo
        </Link>
      </h2>
      <div className="table-responsive">
        {processoList && processoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('numero')}>
                  Numero <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('cnpj')}>
                  Cnpj <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('razaoSocial')}>
                  Razao Social <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('classe')}>
                  Classe <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('assunto')}>
                  Assunto <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('vara')}>
                  Vara <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('juiz')}>
                  Juiz <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataDistribuicao')}>
                  Data Distribuicao <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('distribuicao')}>
                  Distribuicao <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('localFisico')}>
                  Local Fisico <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('controle')}>
                  Controle <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('area')}>
                  Area <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('estado')}>
                  Estado <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('observacao')}>
                  Observacao <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('interesse')}>
                  Interesse <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataCriacao')}>
                  Data Criacao <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataAtualicacao')}>
                  Data Atualicacao <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dataExclusao')}>
                  Data Exclusao <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('link')}>
                  Link <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('valor')}>
                  Valor <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('moeda')}>
                  Moeda <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Comarca <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {processoList.map((processo, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${processo.id}`} color="link" size="sm">
                      {processo.id}
                    </Button>
                  </td>
                  <td>{processo.numero}</td>
                  <td>{processo.cnpj}</td>
                  <td>{processo.razaoSocial}</td>
                  <td>{processo.classe}</td>
                  <td>{processo.assunto}</td>
                  <td>{processo.vara}</td>
                  <td>{processo.juiz}</td>
                  <td>
                    <TextFormat type="date" value={processo.dataDistribuicao} format={APP_LOCAL_DATE_FORMAT} />
                  </td>
                  <td>{processo.distribuicao}</td>
                  <td>{processo.localFisico}</td>
                  <td>{processo.controle}</td>
                  <td>{processo.area}</td>
                  <td>{processo.estado}</td>
                  <td>{processo.observacao}</td>
                  <td>{processo.interesse ? 'true' : 'false'}</td>
                  <td>
                    <TextFormat type="date" value={processo.dataCriacao} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={processo.dataAtualicacao} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={processo.dataExclusao} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{processo.link}</td>
                  <td>{processo.valor}</td>
                  <td>{processo.moeda}</td>
                  <td>{processo.comarcaId ? <Link to={`comarca/${processo.comarcaId}`}>{processo.comarcaId}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${processo.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${processo.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${processo.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
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
          !loading && <div className="alert alert-warning">No Processos found</div>
        )}
      </div>
      <div className={processoList && processoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ processo }: IRootState) => ({
  processoList: processo.entities,
  loading: processo.loading,
  totalItems: processo.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Processo);
