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
import { getFranquiaAreaAtuacaoState, IFranquiaAreaAtuacaoBaseState, getEntities } from './franquia-area-atuacao.reducer';
import { IFranquiaAreaAtuacao } from 'app/shared/model/franquia-area-atuacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IFranquia } from 'app/shared/model/franquia.model';
import { getEntities as getFranquias } from 'app/entities/franquia/franquia.reducer';

export interface IFranquiaAreaAtuacaoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IFranquiaAreaAtuacaoState extends IFranquiaAreaAtuacaoBaseState, IPaginationBaseState {}

export class FranquiaAreaAtuacao extends React.Component<IFranquiaAreaAtuacaoProps, IFranquiaAreaAtuacaoState> {
  private myFormRef: any;

  constructor(props: IFranquiaAreaAtuacaoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getFranquiaAreaAtuacaoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();

    this.props.getFranquias();
  }

  cancelCourse = () => {
    this.setState(
      {
        cepIni: '',
        cepFim: '',
        ativo: '',
        franquia: ''
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
      'cepIni=' +
      this.state.cepIni +
      '&' +
      'cepFim=' +
      this.state.cepFim +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'franquia=' +
      this.state.franquia +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { cepIni, cepFim, ativo, franquia, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(cepIni, cepFim, ativo, franquia, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { franquias, franquiaAreaAtuacaoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Franquia Area Atuacaos</span>
          <Button id="togglerFilterFranquiaAreaAtuacao" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.franquiaAreaAtuacao.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.franquiaAreaAtuacao.home.createLabel">Create a new Franquia Area Atuacao</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Franquia Area Atuacaos</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterFranquiaAreaAtuacao">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'cepIni' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cepIniLabel" for="franquia-area-atuacao-cepIni">
                              <Translate contentKey="generadorApp.franquiaAreaAtuacao.cepIni">Cep Ini</Translate>
                            </Label>

                            <AvInput type="text" name="cepIni" id="franquia-area-atuacao-cepIni" value={this.state.cepIni} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cepFim' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cepFimLabel" for="franquia-area-atuacao-cepFim">
                              <Translate contentKey="generadorApp.franquiaAreaAtuacao.cepFim">Cep Fim</Translate>
                            </Label>

                            <AvInput type="text" name="cepFim" id="franquia-area-atuacao-cepFim" value={this.state.cepFim} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" for="franquia-area-atuacao-ativo">
                              <Translate contentKey="generadorApp.franquiaAreaAtuacao.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="franquia-area-atuacao-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'franquia' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <div style={{ width: '100%' }}>
                              <Label for="franquia-area-atuacao-franquia">
                                <Translate contentKey="generadorApp.franquiaAreaAtuacao.franquia">Franquia</Translate>
                              </Label>
                              <Select
                                id="franquia-area-atuacao-franquia"
                                isMulti
                                className={'css-select-control'}
                                value={
                                  franquias
                                    ? franquias.map(p =>
                                        this.state.franquia.split(',').indexOf(p.id) !== -1 ? { value: p.id, label: p.id } : null
                                      )
                                    : null
                                }
                                options={franquias ? franquias.map(option => ({ value: option.id, label: option.id })) : null}
                                onChange={options => this.setState({ franquia: options.map(option => option['value']).join(',') })}
                                name={'franquia'}
                              />
                            </div>
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.franquiaAreaAtuacao.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.franquiaAreaAtuacao.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {franquiaAreaAtuacaoList && franquiaAreaAtuacaoList.length > 0 ? (
                <Table responsive aria-describedby="franquia-area-atuacao-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'cepIni' ? (
                        <th className="hand" onClick={this.sort('cepIni')}>
                          <Translate contentKey="generadorApp.franquiaAreaAtuacao.cepIni">Cep Ini</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cepFim' ? (
                        <th className="hand" onClick={this.sort('cepFim')}>
                          <Translate contentKey="generadorApp.franquiaAreaAtuacao.cepFim">Cep Fim</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.franquiaAreaAtuacao.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      {this.state.baseFilters !== 'franquia' ? (
                        <th>
                          <Translate contentKey="generadorApp.franquiaAreaAtuacao.franquia">Franquia</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {franquiaAreaAtuacaoList.map((franquiaAreaAtuacao, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${franquiaAreaAtuacao.id}`} color="link" size="sm">
                            {franquiaAreaAtuacao.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'cepIni' ? <td>{franquiaAreaAtuacao.cepIni}</td> : null}

                        {this.state.baseFilters !== 'cepFim' ? <td>{franquiaAreaAtuacao.cepFim}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{franquiaAreaAtuacao.ativo}</td> : null}

                        {this.state.baseFilters !== 'franquia' ? (
                          <td>
                            {franquiaAreaAtuacao.franquia ? (
                              <Link to={`franquia/${franquiaAreaAtuacao.franquia.id}`}>{franquiaAreaAtuacao.franquia.id}</Link>
                            ) : (
                              ''
                            )}
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${franquiaAreaAtuacao.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${franquiaAreaAtuacao.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${franquiaAreaAtuacao.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.franquiaAreaAtuacao.home.notFound">No Franquia Area Atuacaos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={franquiaAreaAtuacaoList && franquiaAreaAtuacaoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ franquiaAreaAtuacao, ...storeState }: IRootState) => ({
  franquias: storeState.franquia.entities,
  franquiaAreaAtuacaoList: franquiaAreaAtuacao.entities,
  totalItems: franquiaAreaAtuacao.totalItems
});

const mapDispatchToProps = {
  getFranquias,
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FranquiaAreaAtuacao);
