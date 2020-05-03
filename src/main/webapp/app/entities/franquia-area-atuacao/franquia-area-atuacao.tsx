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
import { getEntities } from './franquia-area-atuacao.reducer';
import { IFranquiaAreaAtuacao } from 'app/shared/model/franquia-area-atuacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

import { IFranquia } from 'app/shared/model/franquia.model';
import { getEntities as getFranquias } from 'app/entities/franquia/franquia.reducer';

export interface IFranquiaAreaAtuacaoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IFranquiaAreaAtuacaoBaseState {
  cepIni: any;
  cepFim: any;
  ativo: any;
  dataPost: any;
  idFranquia: any;
}
export interface IFranquiaAreaAtuacaoState extends IFranquiaAreaAtuacaoBaseState, IPaginationBaseState {}

export class FranquiaAreaAtuacao extends React.Component<IFranquiaAreaAtuacaoProps, IFranquiaAreaAtuacaoState> {
  private myFormRef: any;

  constructor(props: IFranquiaAreaAtuacaoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...this.getFranquiaAreaAtuacaoState(this.props.location)
    };
  }

  getFranquiaAreaAtuacaoState = (location): IFranquiaAreaAtuacaoBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const cepIni = url.searchParams.get('cepIni') || '';
    const cepFim = url.searchParams.get('cepFim') || '';
    const ativo = url.searchParams.get('ativo') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    const idFranquia = url.searchParams.get('idFranquia') || '';

    return {
      cepIni,
      cepFim,
      ativo,
      dataPost,
      idFranquia
    };
  };

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
        dataPost: '',
        idFranquia: ''
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
      'cepIni=' +
      this.state.cepIni +
      '&' +
      'cepFim=' +
      this.state.cepFim +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      'idFranquia=' +
      this.state.idFranquia +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { cepIni, cepFim, ativo, dataPost, idFranquia, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(cepIni, cepFim, ativo, dataPost, idFranquia, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { franquias, franquiaAreaAtuacaoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Franquia Area Atuacaos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Franquia Area Atuacaos</span>
              <Button id="togglerFilterFranquiaAreaAtuacao" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.franquiaAreaAtuacao.home.createLabel">Create a new Franquia Area Atuacao</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterFranquiaAreaAtuacao">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="cepIniLabel" for="franquia-area-atuacao-cepIni">
                            <Translate contentKey="generadorApp.franquiaAreaAtuacao.cepIni">Cep Ini</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="cepIni"
                            id="franquia-area-atuacao-cepIni"
                            value={this.state.cepIni}
                            validate={{
                              maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="cepFimLabel" for="franquia-area-atuacao-cepFim">
                            <Translate contentKey="generadorApp.franquiaAreaAtuacao.cepFim">Cep Fim</Translate>
                          </Label>

                          <AvInput
                            type="text"
                            name="cepFim"
                            id="franquia-area-atuacao-cepFim"
                            value={this.state.cepFim}
                            validate={{
                              maxLength: { value: 10, errorMessage: translate('entity.validation.maxlength', { max: 10 }) }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ativoLabel" for="franquia-area-atuacao-ativo">
                            <Translate contentKey="generadorApp.franquiaAreaAtuacao.ativo">Ativo</Translate>
                          </Label>
                          <AvInput type="string" name="ativo" id="franquia-area-atuacao-ativo" value={this.state.ativo} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="franquia-area-atuacao-dataPost">
                            <Translate contentKey="generadorApp.franquiaAreaAtuacao.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="franquia-area-atuacao-dataPost"
                            type="datetime-local"
                            className="form-control"
                            name="dataPost"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPost ? convertDateTimeFromServer(this.state.dataPost) : null}
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') }
                            }}
                          />
                        </Row>
                      </Col>

                      <Col md="3">
                        <Row>
                          <div>
                            <Label for="franquia-area-atuacao-idFranquia">
                              <Translate contentKey="generadorApp.franquiaAreaAtuacao.idFranquia">Id Franquia</Translate>
                            </Label>
                            <AvInput id="franquia-area-atuacao-idFranquia" type="select" className="form-control" name="idFranquiaId">
                              <option value="" key="0" />
                              {franquias
                                ? franquias.map(otherEntity => (
                                    <option value={otherEntity.id} key={otherEntity.id}>
                                      {otherEntity.id}
                                    </option>
                                  ))
                                : null}
                            </AvInput>
                          </div>
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

              {franquiaAreaAtuacaoList && franquiaAreaAtuacaoList.length > 0 ? (
                <Table responsive aria-describedby="franquia-area-atuacao-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cepIni')}>
                        <Translate contentKey="generadorApp.franquiaAreaAtuacao.cepIni">Cep Ini</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('cepFim')}>
                        <Translate contentKey="generadorApp.franquiaAreaAtuacao.cepFim">Cep Fim</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ativo')}>
                        <Translate contentKey="generadorApp.franquiaAreaAtuacao.ativo">Ativo</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.franquiaAreaAtuacao.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th>
                        <Translate contentKey="generadorApp.franquiaAreaAtuacao.idFranquia">Id Franquia</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

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

                        <td>{franquiaAreaAtuacao.cepIni}</td>

                        <td>{franquiaAreaAtuacao.cepFim}</td>

                        <td>{franquiaAreaAtuacao.ativo}</td>

                        <td>
                          <TextFormat type="date" value={franquiaAreaAtuacao.dataPost} format={APP_DATE_FORMAT} />
                        </td>
                        <td>
                          {franquiaAreaAtuacao.idFranquia ? (
                            <Link to={`franquia/${franquiaAreaAtuacao.idFranquia.id}`}>{franquiaAreaAtuacao.idFranquia.id}</Link>
                          ) : (
                            ''
                          )}
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${franquiaAreaAtuacao.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${franquiaAreaAtuacao.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${franquiaAreaAtuacao.id}/delete`} color="danger" size="sm">
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
