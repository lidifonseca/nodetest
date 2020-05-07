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
import { getUnidadeEasyAreaAtuacaoState, IUnidadeEasyAreaAtuacaoBaseState, getEntities } from './unidade-easy-area-atuacao.reducer';
import { IUnidadeEasyAreaAtuacao } from 'app/shared/model/unidade-easy-area-atuacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IUnidadeEasy } from 'app/shared/model/unidade-easy.model';
import { getEntities as getUnidadeEasies } from 'app/entities/unidade-easy/unidade-easy.reducer';

export interface IUnidadeEasyAreaAtuacaoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IUnidadeEasyAreaAtuacaoState extends IUnidadeEasyAreaAtuacaoBaseState, IPaginationBaseState {}

export class UnidadeEasyAreaAtuacao extends React.Component<IUnidadeEasyAreaAtuacaoProps, IUnidadeEasyAreaAtuacaoState> {
  private myFormRef: any;

  constructor(props: IUnidadeEasyAreaAtuacaoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getUnidadeEasyAreaAtuacaoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getUnidadeEasies();
  }

  cancelCourse = () => {
    this.setState(
      {
        cepInicial: '',
        cepFinal: '',
        unidade: ''
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
      'cepInicial=' +
      this.state.cepInicial +
      '&' +
      'cepFinal=' +
      this.state.cepFinal +
      '&' +
      'unidade=' +
      this.state.unidade +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { cepInicial, cepFinal, unidade, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(cepInicial, cepFinal, unidade, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { unidadeEasies, unidadeEasyAreaAtuacaoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Unidade Easy Area Atuacaos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Unidade Easy Area Atuacaos</span>
              <Button id="togglerFilterUnidadeEasyAreaAtuacao" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link
                to={`${match.url}/new?${this.getFiltersURL()}`}
                className="btn btn-primary float-right jh-create-entity"
                id="jh-create-entity"
              >
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.home.createLabel">
                  Create a new Unidade Easy Area Atuacao
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterUnidadeEasyAreaAtuacao">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'cepInicial' ? (
                        <Col md="3">
                          <Row>
                            <Label id="cepInicialLabel" for="unidade-easy-area-atuacao-cepInicial">
                              <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.cepInicial">Cep Inicial</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="cepInicial"
                              id="unidade-easy-area-atuacao-cepInicial"
                              value={this.state.cepInicial}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cepFinal' ? (
                        <Col md="3">
                          <Row>
                            <Label id="cepFinalLabel" for="unidade-easy-area-atuacao-cepFinal">
                              <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.cepFinal">Cep Final</Translate>
                            </Label>

                            <AvInput type="text" name="cepFinal" id="unidade-easy-area-atuacao-cepFinal" value={this.state.cepFinal} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <Col md="3">
                          <Row>
                            <div>
                              <Label for="unidade-easy-area-atuacao-unidade">
                                <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.unidade">Unidade</Translate>
                              </Label>
                              <AvInput id="unidade-easy-area-atuacao-unidade" type="select" className="form-control" name="unidadeId">
                                <option value="" key="0" />
                                {unidadeEasies
                                  ? unidadeEasies.map(otherEntity => (
                                      <option value={otherEntity.id} key={otherEntity.id}>
                                        {otherEntity.razaoSocial}
                                      </option>
                                    ))
                                  : null}
                              </AvInput>
                            </div>
                          </Row>
                        </Col>
                      ) : null}
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

              {unidadeEasyAreaAtuacaoList && unidadeEasyAreaAtuacaoList.length > 0 ? (
                <Table responsive aria-describedby="unidade-easy-area-atuacao-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'cepInicial' ? (
                        <th className="hand" onClick={this.sort('cepInicial')}>
                          <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.cepInicial">Cep Inicial</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cepFinal' ? (
                        <th className="hand" onClick={this.sort('cepFinal')}>
                          <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.cepFinal">Cep Final</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'unidade' ? (
                        <th>
                          <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.unidade">Unidade</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {unidadeEasyAreaAtuacaoList.map((unidadeEasyAreaAtuacao, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${unidadeEasyAreaAtuacao.id}`} color="link" size="sm">
                            {unidadeEasyAreaAtuacao.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'cepInicial' ? <td>{unidadeEasyAreaAtuacao.cepInicial}</td> : null}

                        {this.state.baseFilters !== 'cepFinal' ? <td>{unidadeEasyAreaAtuacao.cepFinal}</td> : null}

                        {this.state.baseFilters !== 'unidade' ? (
                          <td>
                            {unidadeEasyAreaAtuacao.unidade ? (
                              <Link to={`unidade-easy/${unidadeEasyAreaAtuacao.unidade.id}`}>{unidadeEasyAreaAtuacao.unidade.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${unidadeEasyAreaAtuacao.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${unidadeEasyAreaAtuacao.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${unidadeEasyAreaAtuacao.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.unidadeEasyAreaAtuacao.home.notFound">No Unidade Easy Area Atuacaos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={unidadeEasyAreaAtuacaoList && unidadeEasyAreaAtuacaoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ unidadeEasyAreaAtuacao, ...storeState }: IRootState) => ({
  unidadeEasies: storeState.unidadeEasy.entities,
  unidadeEasyAreaAtuacaoList: unidadeEasyAreaAtuacao.entities,
  totalItems: unidadeEasyAreaAtuacao.totalItems
});

const mapDispatchToProps = {
  getUnidadeEasies,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(UnidadeEasyAreaAtuacao);
