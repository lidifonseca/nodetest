/* eslint complexity: ["error", 100] */
import React from 'react';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import {
  Button,
  Col,
  Row,
  Table,
  Label,
  UncontrolledTooltip,
  UncontrolledCollapse,
  CardHeader,
  CardBody,
  UncontrolledAlert
} from 'reactstrap';
import { AvForm, div, AvInput } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAllAction, getSortState, IPaginationBaseState, JhiPagination, JhiItemCount } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tipo-prontuario.reducer';
import { ITipoProntuario } from 'app/shared/model/tipo-prontuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ITipoProntuarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ITipoProntuarioBaseState {
  prontuario: any;
  ativo: any;
}
export interface ITipoProntuarioState extends ITipoProntuarioBaseState, IPaginationBaseState {}

export class TipoProntuario extends React.Component<ITipoProntuarioProps, ITipoProntuarioState> {
  private myFormRef: any;

  constructor(props: ITipoProntuarioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getTipoProntuarioState(this.props.location)
    };
  }

  getTipoProntuarioState = (location): ITipoProntuarioBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const prontuario = url.searchParams.get('prontuario') || '';
    const ativo = url.searchParams.get('ativo') || '';

    return {
      prontuario,
      ativo
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        prontuario: '',
        ativo: ''
      },
      () => this.sortEntities()
    );
  };

  filterEntity = (event, errors, values) => {
    this.setState(
      {
        ...this.state,
        ...values
      },
      () => this.sortEntities()
    );
  };

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
    this.props.history.push(this.props.location.pathname + '?' + this.getFiltersURL());
  }

  getFiltersURL = (offset = null) => {
    return (
      'page=' +
      this.state.activePage +
      '&' +
      'size=' +
      this.state.itemsPerPage +
      '&' +
      (offset !== null ? 'offset=' + offset + '&' : '') +
      'sort=' +
      this.state.sort +
      ',' +
      this.state.order +
      '&' +
      'prontuario=' +
      this.state.prontuario +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { prontuario, ativo, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(prontuario, ativo, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { tipoProntuarioList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Tipo Prontuarios</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Tipo Prontuarios</span>
              <Button id="togglerFilterTipoProntuario" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.tipoProntuario.home.createLabel">Create a new Tipo Prontuario</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterTipoProntuario">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="prontuarioLabel" for="tipo-prontuario-prontuario">
                            <Translate contentKey="generadorApp.tipoProntuario.prontuario">Prontuario</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="prontuario"
                            id="tipo-prontuario-prontuario"
                            value={this.state.prontuario}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              maxLength: { value: 45, errorMessage: translate('entity.validation.maxlength', { max: 45 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="tipo-prontuario-ativo">
                            <Translate contentKey="generadorApp.tipoProntuario.ativo">Ativo</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="ativo"
                            id="tipo-prontuario-ativo"
                            value={this.state.ativo}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="entity.validation.filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="entity.validation.clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {tipoProntuarioList && tipoProntuarioList.length > 0 ? (
                <Table responsive aria-describedby="tipo-prontuario-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('prontuario')}>
                        <Translate contentKey="generadorApp.tipoProntuario.prontuario">Prontuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.tipoProntuario.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {tipoProntuarioList.map((tipoProntuario, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${tipoProntuario.id}`} color="link" size="sm">
                            {tipoProntuario.id}
                          </Button>
                        </td>

                        <td>{tipoProntuario.prontuario}</td>

                        <td>{tipoProntuario.ativo}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${tipoProntuario.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${tipoProntuario.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${tipoProntuario.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.tipoProntuario.home.notFound">No Tipo Prontuarios found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={tipoProntuarioList && tipoProntuarioList.length > 0 ? '' : 'd-none'}>
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
          </PanelFooter>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = ({ tipoProntuario, ...storeState }: IRootState) => ({
  tipoProntuarioList: tipoProntuario.entities,
  totalItems: tipoProntuario.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoProntuario);