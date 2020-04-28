import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './audiencia.reducer';
import { IAudiencia } from 'app/shared/model/audiencia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IAudienciaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IAudienciaState = IPaginationBaseState;

export class Audiencia extends React.Component<IAudienciaProps, IAudienciaState> {
  state: IAudienciaState = {
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.getEntities();
  }

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.sortEntities()
    );
  };

  sortEntities() {
    this.getEntities();
    this.props.history.push(`${this.props.location.pathname}?page=${this.state.activePage}&sort=${this.state.sort},${this.state.order}`);
  }

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { audienciaList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="audiencia-heading">
          <Translate contentKey="tjscrapperApp.audiencia.home.title">Audiencias</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="tjscrapperApp.audiencia.home.createLabel">Create a new Audiencia</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {audienciaList && audienciaList.length > 0 ? (
            <Table responsive aria-describedby="audiencia-heading">
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('data')}>
                    <Translate contentKey="tjscrapperApp.audiencia.data">Data</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('audencia')}>
                    <Translate contentKey="tjscrapperApp.audiencia.audencia">Audencia</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('situacao')}>
                    <Translate contentKey="tjscrapperApp.audiencia.situacao">Situacao</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('quatidadePessoas')}>
                    <Translate contentKey="tjscrapperApp.audiencia.quatidadePessoas">Quatidade Pessoas</Translate>{' '}
                    <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="tjscrapperApp.audiencia.processo">Processo</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {audienciaList.map((audiencia, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${audiencia.id}`} color="link" size="sm">
                        {audiencia.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={audiencia.data} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{audiencia.audencia}</td>
                    <td>{audiencia.situacao}</td>
                    <td>{audiencia.quatidadePessoas}</td>
                    <td>{audiencia.processoId ? <Link to={`processo/${audiencia.processoId}`}>{audiencia.processoId}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${audiencia.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${audiencia.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${audiencia.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">
              <Translate contentKey="tjscrapperApp.audiencia.home.notFound">No Audiencias found</Translate>
            </div>
          )}
        </div>
        <div className={audienciaList && audienciaList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={this.state.activePage} total={totalItems} itemsPerPage={this.state.itemsPerPage} i18nEnabled />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={this.state.activePage}
              onSelect={this.handlePagination}
              maxButtons={5}
              itemsPerPage={this.state.itemsPerPage}
              totalItems={this.props.totalItems}
            />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ audiencia }: IRootState) => ({
  audienciaList: audiencia.entities,
  totalItems: audiencia.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Audiencia);
