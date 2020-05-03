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
import {
  Translate,
  translate,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './profissional-horario.reducer';
import { IProfissionalHorario } from 'app/shared/model/profissional-horario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProfissionalHorarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProfissionalHorarioBaseState {
  idAtendimento: any;
  idProfissional: any;
  horario: any;
  confirm: any;
}
export interface IProfissionalHorarioState extends IProfissionalHorarioBaseState, IPaginationBaseState {}

export class ProfissionalHorario extends React.Component<IProfissionalHorarioProps, IProfissionalHorarioState> {
  private myFormRef: any;

  constructor(props: IProfissionalHorarioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getProfissionalHorarioState(this.props.location)
    };
  }

  getProfissionalHorarioState = (location): IProfissionalHorarioBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idAtendimento = url.searchParams.get('idAtendimento') || '';
    const idProfissional = url.searchParams.get('idProfissional') || '';
    const horario = url.searchParams.get('horario') || '';
    const confirm = url.searchParams.get('confirm') || '';

    return {
      idAtendimento,
      idProfissional,
      horario,
      confirm
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idAtendimento: '',
        idProfissional: '',
        horario: '',
        confirm: ''
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
      'idAtendimento=' +
      this.state.idAtendimento +
      '&' +
      'idProfissional=' +
      this.state.idProfissional +
      '&' +
      'horario=' +
      this.state.horario +
      '&' +
      'confirm=' +
      this.state.confirm +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idAtendimento, idProfissional, horario, confirm, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idAtendimento, idProfissional, horario, confirm, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { profissionalHorarioList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Horarios</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Profissional Horarios</span>
              <Button id="togglerFilterProfissionalHorario" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.profissionalHorario.home.createLabel">Create a new Profissional Horario</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProfissionalHorario">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idAtendimentoLabel" for="profissional-horario-idAtendimento">
                            <Translate contentKey="generadorApp.profissionalHorario.idAtendimento">Id Atendimento</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idAtendimento"
                            id="profissional-horario-idAtendimento"
                            value={this.state.idAtendimento}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idProfissionalLabel" for="profissional-horario-idProfissional">
                            <Translate contentKey="generadorApp.profissionalHorario.idProfissional">Id Profissional</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idProfissional"
                            id="profissional-horario-idProfissional"
                            value={this.state.idProfissional}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="horarioLabel" for="profissional-horario-horario">
                            <Translate contentKey="generadorApp.profissionalHorario.horario">Horario</Translate>
                          </Label>
                          <AvInput
                            id="profissional-horario-horario"
                            type="datetime-local"
                            className="form-control"
                            name="horario"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.horario ? convertDateTimeFromServer(this.state.horario) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="confirmLabel" for="profissional-horario-confirm">
                            <Translate contentKey="generadorApp.profissionalHorario.confirm">Confirm</Translate>
                          </Label>
                          <AvInput type="string" name="confirm" id="profissional-horario-confirm" value={this.state.confirm} />
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

              {profissionalHorarioList && profissionalHorarioList.length > 0 ? (
                <Table responsive aria-describedby="profissional-horario-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idAtendimento')}>
                        <Translate contentKey="generadorApp.profissionalHorario.idAtendimento">Id Atendimento</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idProfissional')}>
                        <Translate contentKey="generadorApp.profissionalHorario.idProfissional">Id Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('horario')}>
                        <Translate contentKey="generadorApp.profissionalHorario.horario">Horario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('confirm')}>
                        <Translate contentKey="generadorApp.profissionalHorario.confirm">Confirm</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {profissionalHorarioList.map((profissionalHorario, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${profissionalHorario.id}`} color="link" size="sm">
                            {profissionalHorario.id}
                          </Button>
                        </td>

                        <td>{profissionalHorario.idAtendimento}</td>

                        <td>{profissionalHorario.idProfissional}</td>

                        <td>
                          <TextFormat type="date" value={profissionalHorario.horario} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{profissionalHorario.confirm}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${profissionalHorario.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${profissionalHorario.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${profissionalHorario.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.profissionalHorario.home.notFound">No Profissional Horarios found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={profissionalHorarioList && profissionalHorarioList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ profissionalHorario, ...storeState }: IRootState) => ({
  profissionalHorarioList: profissionalHorario.entities,
  totalItems: profissionalHorario.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalHorario);
