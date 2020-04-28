import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './historico-clase.reducer';
import { IHistoricoClase } from 'app/shared/model/historico-clase.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IHistoricoClaseProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export type IHistoricoClaseState = IPaginationBaseState;

export class HistoricoClase extends React.Component<IHistoricoClaseProps, IHistoricoClaseState> {
  state: IHistoricoClaseState = {
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
    const { historicoClaseList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="historico-clase-heading">
          <Translate contentKey="tjscrapperApp.historicoClase.home.title">Historico Clases</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="tjscrapperApp.historicoClase.home.createLabel">Create a new Historico Clase</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          {historicoClaseList && historicoClaseList.length > 0 ? (
            <Table responsive aria-describedby="historico-clase-heading">
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('data')}>
                    <Translate contentKey="tjscrapperApp.historicoClase.data">Data</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('tipo')}>
                    <Translate contentKey="tjscrapperApp.historicoClase.tipo">Tipo</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('classe')}>
                    <Translate contentKey="tjscrapperApp.historicoClase.classe">Classe</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('area')}>
                    <Translate contentKey="tjscrapperApp.historicoClase.area">Area</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('motivo')}>
                    <Translate contentKey="tjscrapperApp.historicoClase.motivo">Motivo</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="tjscrapperApp.historicoClase.processo">Processo</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {historicoClaseList.map((historicoClase, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${historicoClase.id}`} color="link" size="sm">
                        {historicoClase.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={historicoClase.data} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{historicoClase.tipo}</td>
                    <td>{historicoClase.classe}</td>
                    <td>{historicoClase.area}</td>
                    <td>{historicoClase.motivo}</td>
                    <td>
                      {historicoClase.processoId ? (
                        <Link to={`processo/${historicoClase.processoId}`}>{historicoClase.processoId}</Link>
                      ) : (
                        ''
                      )}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${historicoClase.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${historicoClase.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${historicoClase.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="tjscrapperApp.historicoClase.home.notFound">No Historico Clases found</Translate>
            </div>
          )}
        </div>
        <div className={historicoClaseList && historicoClaseList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ historicoClase }: IRootState) => ({
  historicoClaseList: historicoClase.entities,
  totalItems: historicoClase.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoricoClase);
