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
import { getProfissionalAreaAtuacaoState, IProfissionalAreaAtuacaoBaseState, getEntities } from './profissional-area-atuacao.reducer';
import { IProfissionalAreaAtuacao } from 'app/shared/model/profissional-area-atuacao.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProfissionalAreaAtuacaoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProfissionalAreaAtuacaoState extends IProfissionalAreaAtuacaoBaseState, IPaginationBaseState {}

export class ProfissionalAreaAtuacao extends React.Component<IProfissionalAreaAtuacaoProps, IProfissionalAreaAtuacaoState> {
  private myFormRef: any;

  constructor(props: IProfissionalAreaAtuacaoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getProfissionalAreaAtuacaoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idProfissional: '',
        cepArea: '',
        cepFim: '',
        ativo: '',
        cepIni: ''
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
      'idProfissional=' +
      this.state.idProfissional +
      '&' +
      'cepArea=' +
      this.state.cepArea +
      '&' +
      'cepFim=' +
      this.state.cepFim +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'cepIni=' +
      this.state.cepIni +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idProfissional, cepArea, cepFim, ativo, cepIni, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idProfissional, cepArea, cepFim, ativo, cepIni, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { profissionalAreaAtuacaoList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Profissional Area Atuacaos</span>
          <Button id="togglerFilterProfissionalAreaAtuacao" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.profissionalAreaAtuacao.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.profissionalAreaAtuacao.home.createLabel">Create a new Profissional Area Atuacao</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Area Atuacaos</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProfissionalAreaAtuacao">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idProfissional' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idProfissionalLabel" for="profissional-area-atuacao-idProfissional">
                              <Translate contentKey="generadorApp.profissionalAreaAtuacao.idProfissional">Id Profissional</Translate>
                            </Label>

                            <AvInput
                              type="text"
                              name="idProfissional"
                              id="profissional-area-atuacao-idProfissional"
                              value={this.state.idProfissional}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cepArea' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cepAreaLabel" for="profissional-area-atuacao-cepArea">
                              <Translate contentKey="generadorApp.profissionalAreaAtuacao.cepArea">Cep Area</Translate>
                            </Label>

                            <AvInput type="text" name="cepArea" id="profissional-area-atuacao-cepArea" value={this.state.cepArea} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cepFim' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cepFimLabel" for="profissional-area-atuacao-cepFim">
                              <Translate contentKey="generadorApp.profissionalAreaAtuacao.cepFim">Cep Fim</Translate>
                            </Label>

                            <AvInput type="text" name="cepFim" id="profissional-area-atuacao-cepFim" value={this.state.cepFim} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" check>
                              <AvInput id="profissional-area-atuacao-ativo" type="checkbox" className="form-control" name="ativo" />
                              <Translate contentKey="generadorApp.profissionalAreaAtuacao.ativo">Ativo</Translate>
                            </Label>
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'cepIni' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="cepIniLabel" for="profissional-area-atuacao-cepIni">
                              <Translate contentKey="generadorApp.profissionalAreaAtuacao.cepIni">Cep Ini</Translate>
                            </Label>

                            <AvInput type="text" name="cepIni" id="profissional-area-atuacao-cepIni" value={this.state.cepIni} />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.profissionalAreaAtuacao.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.profissionalAreaAtuacao.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {profissionalAreaAtuacaoList && profissionalAreaAtuacaoList.length > 0 ? (
                <Table responsive aria-describedby="profissional-area-atuacao-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idProfissional' ? (
                        <th className="hand" onClick={this.sort('idProfissional')}>
                          <Translate contentKey="generadorApp.profissionalAreaAtuacao.idProfissional">Id Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cepArea' ? (
                        <th className="hand" onClick={this.sort('cepArea')}>
                          <Translate contentKey="generadorApp.profissionalAreaAtuacao.cepArea">Cep Area</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cepFim' ? (
                        <th className="hand" onClick={this.sort('cepFim')}>
                          <Translate contentKey="generadorApp.profissionalAreaAtuacao.cepFim">Cep Fim</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.profissionalAreaAtuacao.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'cepIni' ? (
                        <th className="hand" onClick={this.sort('cepIni')}>
                          <Translate contentKey="generadorApp.profissionalAreaAtuacao.cepIni">Cep Ini</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {profissionalAreaAtuacaoList.map((profissionalAreaAtuacao, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${profissionalAreaAtuacao.id}`} color="link" size="sm">
                            {profissionalAreaAtuacao.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idProfissional' ? <td>{profissionalAreaAtuacao.idProfissional}</td> : null}

                        {this.state.baseFilters !== 'cepArea' ? <td>{profissionalAreaAtuacao.cepArea}</td> : null}

                        {this.state.baseFilters !== 'cepFim' ? <td>{profissionalAreaAtuacao.cepFim}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{profissionalAreaAtuacao.ativo ? 'true' : 'false'}</td> : null}

                        {this.state.baseFilters !== 'cepIni' ? <td>{profissionalAreaAtuacao.cepIni}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${profissionalAreaAtuacao.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${profissionalAreaAtuacao.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${profissionalAreaAtuacao.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.profissionalAreaAtuacao.home.notFound">No Profissional Area Atuacaos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={profissionalAreaAtuacaoList && profissionalAreaAtuacaoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ profissionalAreaAtuacao, ...storeState }: IRootState) => ({
  profissionalAreaAtuacaoList: profissionalAreaAtuacao.entities,
  totalItems: profissionalAreaAtuacao.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalAreaAtuacao);
