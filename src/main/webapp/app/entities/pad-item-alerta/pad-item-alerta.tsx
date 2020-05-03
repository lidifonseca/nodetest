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
import { getEntities } from './pad-item-alerta.reducer';
import { IPadItemAlerta } from 'app/shared/model/pad-item-alerta.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IPadItemAlertaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IPadItemAlertaBaseState {
  padItemMetaId: any;
  envioEmailEm: any;
  visualizadoEm: any;
  criadoEm: any;
  ativo: any;
  mensagem: any;
}
export interface IPadItemAlertaState extends IPadItemAlertaBaseState, IPaginationBaseState {}

export class PadItemAlerta extends React.Component<IPadItemAlertaProps, IPadItemAlertaState> {
  private myFormRef: any;

  constructor(props: IPadItemAlertaProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getPadItemAlertaState(this.props.location)
    };
  }

  getPadItemAlertaState = (location): IPadItemAlertaBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const padItemMetaId = url.searchParams.get('padItemMetaId') || '';
    const envioEmailEm = url.searchParams.get('envioEmailEm') || '';
    const visualizadoEm = url.searchParams.get('visualizadoEm') || '';
    const criadoEm = url.searchParams.get('criadoEm') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const mensagem = url.searchParams.get('mensagem') || '';

    return {
      padItemMetaId,
      envioEmailEm,
      visualizadoEm,
      criadoEm,
      ativo,
      mensagem
    };
  };

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        padItemMetaId: '',
        envioEmailEm: '',
        visualizadoEm: '',
        criadoEm: '',
        ativo: '',
        mensagem: ''
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
      'padItemMetaId=' +
      this.state.padItemMetaId +
      '&' +
      'envioEmailEm=' +
      this.state.envioEmailEm +
      '&' +
      'visualizadoEm=' +
      this.state.visualizadoEm +
      '&' +
      'criadoEm=' +
      this.state.criadoEm +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'mensagem=' +
      this.state.mensagem +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { padItemMetaId, envioEmailEm, visualizadoEm, criadoEm, ativo, mensagem, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(
      padItemMetaId,
      envioEmailEm,
      visualizadoEm,
      criadoEm,
      ativo,
      mensagem,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { padItemAlertaList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Alertas</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pad Item Alertas</span>
              <Button id="togglerFilterPadItemAlerta" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.padItemAlerta.home.createLabel">Create a new Pad Item Alerta</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterPadItemAlerta">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="padItemMetaIdLabel" for="pad-item-alerta-padItemMetaId">
                            <Translate contentKey="generadorApp.padItemAlerta.padItemMetaId">Pad Item Meta Id</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="padItemMetaId"
                            id="pad-item-alerta-padItemMetaId"
                            value={this.state.padItemMetaId}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="envioEmailEmLabel" for="pad-item-alerta-envioEmailEm">
                            <Translate contentKey="generadorApp.padItemAlerta.envioEmailEm">Envio Email Em</Translate>
                          </Label>
                          <AvInput
                            id="pad-item-alerta-envioEmailEm"
                            type="datetime-local"
                            className="form-control"
                            name="envioEmailEm"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.envioEmailEm ? convertDateTimeFromServer(this.state.envioEmailEm) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="visualizadoEmLabel" for="pad-item-alerta-visualizadoEm">
                            <Translate contentKey="generadorApp.padItemAlerta.visualizadoEm">Visualizado Em</Translate>
                          </Label>
                          <AvInput
                            id="pad-item-alerta-visualizadoEm"
                            type="datetime-local"
                            className="form-control"
                            name="visualizadoEm"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.visualizadoEm ? convertDateTimeFromServer(this.state.visualizadoEm) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="criadoEmLabel" for="pad-item-alerta-criadoEm">
                            <Translate contentKey="generadorApp.padItemAlerta.criadoEm">Criado Em</Translate>
                          </Label>
                          <AvInput
                            id="pad-item-alerta-criadoEm"
                            type="datetime-local"
                            className="form-control"
                            name="criadoEm"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.criadoEm ? convertDateTimeFromServer(this.state.criadoEm) : null}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" check>
                            <AvInput id="pad-item-alerta-ativo" type="checkbox" className="form-control" name="ativo" />
                            <Translate contentKey="generadorApp.padItemAlerta.ativo">Ativo</Translate>
                          </Label>
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="mensagemLabel" for="pad-item-alerta-mensagem">
                            <Translate contentKey="generadorApp.padItemAlerta.mensagem">Mensagem</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="mensagem"
                            id="pad-item-alerta-mensagem"
                            value={this.state.mensagem}
                            validate={{
                              maxLength: { value: 100, errorMessage: translate('entity.validation.maxlength', { max: 100 }) }
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

              {padItemAlertaList && padItemAlertaList.length > 0 ? (
                <Table responsive aria-describedby="pad-item-alerta-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('padItemMetaId')}>
                        <Translate contentKey="generadorApp.padItemAlerta.padItemMetaId">Pad Item Meta Id</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('envioEmailEm')}>
                        <Translate contentKey="generadorApp.padItemAlerta.envioEmailEm">Envio Email Em</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('visualizadoEm')}>
                        <Translate contentKey="generadorApp.padItemAlerta.visualizadoEm">Visualizado Em</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('criadoEm')}>
                        <Translate contentKey="generadorApp.padItemAlerta.criadoEm">Criado Em</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.padItemAlerta.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('mensagem')}>
                        <Translate contentKey="generadorApp.padItemAlerta.mensagem">Mensagem</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {padItemAlertaList.map((padItemAlerta, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${padItemAlerta.id}`} color="link" size="sm">
                            {padItemAlerta.id}
                          </Button>
                        </td>

                        <td>{padItemAlerta.padItemMetaId}</td>

                        <td>
                          <TextFormat type="date" value={padItemAlerta.envioEmailEm} format={APP_DATE_FORMAT} />
                        </td>

                        <td>
                          <TextFormat type="date" value={padItemAlerta.visualizadoEm} format={APP_DATE_FORMAT} />
                        </td>

                        <td>
                          <TextFormat type="date" value={padItemAlerta.criadoEm} format={APP_DATE_FORMAT} />
                        </td>

                        <td>{padItemAlerta.ativo ? 'true' : 'false'}</td>

                        <td>{padItemAlerta.mensagem}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${padItemAlerta.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padItemAlerta.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${padItemAlerta.id}/delete`} color="danger" size="sm">
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
                  <Translate contentKey="generadorApp.padItemAlerta.home.notFound">No Pad Item Alertas found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={padItemAlertaList && padItemAlertaList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ padItemAlerta, ...storeState }: IRootState) => ({
  padItemAlertaList: padItemAlerta.entities,
  totalItems: padItemAlerta.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemAlerta);
