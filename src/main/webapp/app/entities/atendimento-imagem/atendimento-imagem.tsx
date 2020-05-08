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
import { getAtendimentoImagemState, IAtendimentoImagemBaseState, getEntities } from './atendimento-imagem.reducer';
import { IAtendimentoImagem } from 'app/shared/model/atendimento-imagem.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IAtendimentoImagemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IAtendimentoImagemState extends IAtendimentoImagemBaseState, IPaginationBaseState {}

export class AtendimentoImagem extends React.Component<IAtendimentoImagemProps, IAtendimentoImagemState> {
  private myFormRef: any;

  constructor(props: IAtendimentoImagemProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getAtendimentoImagemState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        atendimentoId: '',
        imagem: '',
        criadoEm: ''
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
      'atendimentoId=' +
      this.state.atendimentoId +
      '&' +
      'imagem=' +
      this.state.imagem +
      '&' +
      'criadoEm=' +
      this.state.criadoEm +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { atendimentoId, imagem, criadoEm, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(atendimentoId, imagem, criadoEm, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { atendimentoImagemList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Atendimento Imagems</span>
          <Button id="togglerFilterAtendimentoImagem" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.atendimentoImagem.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.atendimentoImagem.home.createLabel">Create a new Atendimento Imagem</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Atendimento Imagems</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterAtendimentoImagem">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'atendimentoId' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="atendimentoIdLabel" for="atendimento-imagem-atendimentoId">
                              <Translate contentKey="generadorApp.atendimentoImagem.atendimentoId">Atendimento Id</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="atendimentoId"
                              id="atendimento-imagem-atendimentoId"
                              value={this.state.atendimentoId}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'imagem' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="imagemLabel" for="atendimento-imagem-imagem">
                              <Translate contentKey="generadorApp.atendimentoImagem.imagem">Imagem</Translate>
                            </Label>

                            <AvInput type="text" name="imagem" id="atendimento-imagem-imagem" value={this.state.imagem} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'criadoEm' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="criadoEmLabel" for="atendimento-imagem-criadoEm">
                              <Translate contentKey="generadorApp.atendimentoImagem.criadoEm">Criado Em</Translate>
                            </Label>
                            <AvInput
                              id="atendimento-imagem-criadoEm"
                              type="datetime-local"
                              className="form-control"
                              name="criadoEm"
                              placeholder={'YYYY-MM-DD HH:mm'}
                              value={this.state.criadoEm ? convertDateTimeFromServer(this.state.criadoEm) : null}
                            />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.atendimentoImagem.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.atendimentoImagem.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {atendimentoImagemList && atendimentoImagemList.length > 0 ? (
                <Table responsive aria-describedby="atendimento-imagem-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'atendimentoId' ? (
                        <th className="hand" onClick={this.sort('atendimentoId')}>
                          <Translate contentKey="generadorApp.atendimentoImagem.atendimentoId">Atendimento Id</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'imagem' ? (
                        <th className="hand" onClick={this.sort('imagem')}>
                          <Translate contentKey="generadorApp.atendimentoImagem.imagem">Imagem</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'criadoEm' ? (
                        <th className="hand" onClick={this.sort('criadoEm')}>
                          <Translate contentKey="generadorApp.atendimentoImagem.criadoEm">Criado Em</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {atendimentoImagemList.map((atendimentoImagem, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${atendimentoImagem.id}`} color="link" size="sm">
                            {atendimentoImagem.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'atendimentoId' ? <td>{atendimentoImagem.atendimentoId}</td> : null}

                        {this.state.baseFilters !== 'imagem' ? <td>{atendimentoImagem.imagem}</td> : null}

                        {this.state.baseFilters !== 'criadoEm' ? (
                          <td>
                            <TextFormat type="date" value={atendimentoImagem.criadoEm} format={APP_DATE_FORMAT} />
                          </td>
                        ) : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${atendimentoImagem.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${atendimentoImagem.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${atendimentoImagem.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.atendimentoImagem.home.notFound">No Atendimento Imagems found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={atendimentoImagemList && atendimentoImagemList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ atendimentoImagem, ...storeState }: IRootState) => ({
  atendimentoImagemList: atendimentoImagem.entities,
  totalItems: atendimentoImagem.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AtendimentoImagem);
