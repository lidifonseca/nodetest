/* eslint complexity: ["error", 300] */
import React from 'react';
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { connect } from 'react-redux';
import Select from 'react-select';
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
import { getControleDisparoAvisoState, IControleDisparoAvisoBaseState, getEntities } from './controle-disparo-aviso.reducer';
import { IControleDisparoAviso } from 'app/shared/model/controle-disparo-aviso.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IControleDisparoAvisoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IControleDisparoAvisoState extends IControleDisparoAvisoBaseState, IPaginationBaseState {}

export class ControleDisparoAviso extends React.Component<IControleDisparoAvisoProps, IControleDisparoAvisoState> {
  private myFormRef: any;

  constructor(props: IControleDisparoAvisoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getControleDisparoAvisoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idAtendimento: '',
        qtdDisparo: '',
        avisopush: ''
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
      'baseFilters=' +
      this.state.baseFilters +
      '&page=' +
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
      'qtdDisparo=' +
      this.state.qtdDisparo +
      '&' +
      'avisopush=' +
      this.state.avisopush +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idAtendimento, qtdDisparo, avisopush, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idAtendimento, qtdDisparo, avisopush, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { controleDisparoAvisoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Controle Disparo Avisos</span>
          <Button id="togglerFilterControleDisparoAviso" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.controleDisparoAviso.home.btn_filter_open">Filters</Translate>
            &nbsp;
            <FontAwesomeIcon icon="caret-down" />
          </Button>{' '}
          &nbsp;
          <Link
            to={`${match.url}/new?${this.getFiltersURL()}`}
            className="btn btn-primary float-right jh-create-entity"
            id="jh-create-entity"
          >
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="generadorApp.controleDisparoAviso.home.createLabel">Create a new Controle Disparo Aviso</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Controle Disparo Avisos</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterControleDisparoAviso">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idAtendimento' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idAtendimentoLabel" for="controle-disparo-aviso-idAtendimento">
                              <Translate contentKey="generadorApp.controleDisparoAviso.idAtendimento">Id Atendimento</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idAtendimento"
                              id="controle-disparo-aviso-idAtendimento"
                              value={this.state.idAtendimento}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'qtdDisparo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="qtdDisparoLabel" for="controle-disparo-aviso-qtdDisparo">
                              <Translate contentKey="generadorApp.controleDisparoAviso.qtdDisparo">Qtd Disparo</Translate>
                            </Label>
                            <AvInput type="string" name="qtdDisparo" id="controle-disparo-aviso-qtdDisparo" value={this.state.qtdDisparo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'avisopush' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="avisopushLabel" for="controle-disparo-aviso-avisopush">
                              <Translate contentKey="generadorApp.controleDisparoAviso.avisopush">Avisopush</Translate>
                            </Label>
                            <AvInput type="string" name="avisopush" id="controle-disparo-aviso-avisopush" value={this.state.avisopush} />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.controleDisparoAviso.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.controleDisparoAviso.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {controleDisparoAvisoList && controleDisparoAvisoList.length > 0 ? (
                <Table responsive aria-describedby="controle-disparo-aviso-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idAtendimento' ? (
                        <th className="hand" onClick={this.sort('idAtendimento')}>
                          <Translate contentKey="generadorApp.controleDisparoAviso.idAtendimento">Id Atendimento</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'qtdDisparo' ? (
                        <th className="hand" onClick={this.sort('qtdDisparo')}>
                          <Translate contentKey="generadorApp.controleDisparoAviso.qtdDisparo">Qtd Disparo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'avisopush' ? (
                        <th className="hand" onClick={this.sort('avisopush')}>
                          <Translate contentKey="generadorApp.controleDisparoAviso.avisopush">Avisopush</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {controleDisparoAvisoList.map((controleDisparoAviso, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${controleDisparoAviso.id}`} color="link" size="sm">
                            {controleDisparoAviso.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idAtendimento' ? <td>{controleDisparoAviso.idAtendimento}</td> : null}

                        {this.state.baseFilters !== 'qtdDisparo' ? <td>{controleDisparoAviso.qtdDisparo}</td> : null}

                        {this.state.baseFilters !== 'avisopush' ? <td>{controleDisparoAviso.avisopush}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${controleDisparoAviso.id}?${this.getFiltersURL()}`}
                              color="info"
                              size="sm"
                            >
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${controleDisparoAviso.id}/edit?${this.getFiltersURL()}`}
                              color="primary"
                              size="sm"
                            >
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${controleDisparoAviso.id}/delete?${this.getFiltersURL()}`}
                              color="danger"
                              size="sm"
                            >
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
                  <Translate contentKey="generadorApp.controleDisparoAviso.home.notFound">No Controle Disparo Avisos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={controleDisparoAvisoList && controleDisparoAvisoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ controleDisparoAviso, ...storeState }: IRootState) => ({
  controleDisparoAvisoList: controleDisparoAviso.entities,
  totalItems: controleDisparoAviso.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ControleDisparoAviso);
