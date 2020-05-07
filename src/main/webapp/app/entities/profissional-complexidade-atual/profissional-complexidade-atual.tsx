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
import {
  getProfissionalComplexidadeAtualState,
  IProfissionalComplexidadeAtualBaseState,
  getEntities
} from './profissional-complexidade-atual.reducer';
import { IProfissionalComplexidadeAtual } from 'app/shared/model/profissional-complexidade-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProfissionalComplexidadeAtualProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProfissionalComplexidadeAtualState extends IProfissionalComplexidadeAtualBaseState, IPaginationBaseState {}

export class ProfissionalComplexidadeAtual extends React.Component<
  IProfissionalComplexidadeAtualProps,
  IProfissionalComplexidadeAtualState
> {
  private myFormRef: any;

  constructor(props: IProfissionalComplexidadeAtualProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getProfissionalComplexidadeAtualState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idProfissional: '',
        baixa: '',
        media: '',
        alta: '',
        ventilacaoMecanica: '',
        telemonitoramente: ''
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
      'baixa=' +
      this.state.baixa +
      '&' +
      'media=' +
      this.state.media +
      '&' +
      'alta=' +
      this.state.alta +
      '&' +
      'ventilacaoMecanica=' +
      this.state.ventilacaoMecanica +
      '&' +
      'telemonitoramente=' +
      this.state.telemonitoramente +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idProfissional, baixa, media, alta, ventilacaoMecanica, telemonitoramente, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(
      idProfissional,
      baixa,
      media,
      alta,
      ventilacaoMecanica,
      telemonitoramente,
      activePage - 1,
      itemsPerPage,
      `${sort},${order}`
    );
  };

  render() {
    const { profissionalComplexidadeAtualList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Complexidade Atuals</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Profissional Complexidade Atuals</span>
              <Button id="togglerFilterProfissionalComplexidadeAtual" className="btn btn-primary float-right jh-create-entity">
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
                <Translate contentKey="generadorApp.profissionalComplexidadeAtual.home.createLabel">
                  Create a new Profissional Complexidade Atual
                </Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterProfissionalComplexidadeAtual">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idProfissional' ? (
                        <Col md="3">
                          <Row>
                            <Label id="idProfissionalLabel" for="profissional-complexidade-atual-idProfissional">
                              <Translate contentKey="generadorApp.profissionalComplexidadeAtual.idProfissional">Id Profissional</Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="idProfissional"
                              id="profissional-complexidade-atual-idProfissional"
                              value={this.state.idProfissional}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'baixa' ? (
                        <Col md="3">
                          <Row>
                            <Label id="baixaLabel" for="profissional-complexidade-atual-baixa">
                              <Translate contentKey="generadorApp.profissionalComplexidadeAtual.baixa">Baixa</Translate>
                            </Label>
                            <AvInput type="string" name="baixa" id="profissional-complexidade-atual-baixa" value={this.state.baixa} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'media' ? (
                        <Col md="3">
                          <Row>
                            <Label id="mediaLabel" for="profissional-complexidade-atual-media">
                              <Translate contentKey="generadorApp.profissionalComplexidadeAtual.media">Media</Translate>
                            </Label>
                            <AvInput type="string" name="media" id="profissional-complexidade-atual-media" value={this.state.media} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'alta' ? (
                        <Col md="3">
                          <Row>
                            <Label id="altaLabel" for="profissional-complexidade-atual-alta">
                              <Translate contentKey="generadorApp.profissionalComplexidadeAtual.alta">Alta</Translate>
                            </Label>
                            <AvInput type="string" name="alta" id="profissional-complexidade-atual-alta" value={this.state.alta} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ventilacaoMecanica' ? (
                        <Col md="3">
                          <Row>
                            <Label id="ventilacaoMecanicaLabel" for="profissional-complexidade-atual-ventilacaoMecanica">
                              <Translate contentKey="generadorApp.profissionalComplexidadeAtual.ventilacaoMecanica">
                                Ventilacao Mecanica
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="ventilacaoMecanica"
                              id="profissional-complexidade-atual-ventilacaoMecanica"
                              value={this.state.ventilacaoMecanica}
                            />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'telemonitoramente' ? (
                        <Col md="3">
                          <Row>
                            <Label id="telemonitoramenteLabel" for="profissional-complexidade-atual-telemonitoramente">
                              <Translate contentKey="generadorApp.profissionalComplexidadeAtual.telemonitoramente">
                                Telemonitoramente
                              </Translate>
                            </Label>
                            <AvInput
                              type="string"
                              name="telemonitoramente"
                              id="profissional-complexidade-atual-telemonitoramente"
                              value={this.state.telemonitoramente}
                            />
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

              {profissionalComplexidadeAtualList && profissionalComplexidadeAtualList.length > 0 ? (
                <Table responsive aria-describedby="profissional-complexidade-atual-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idProfissional' ? (
                        <th className="hand" onClick={this.sort('idProfissional')}>
                          <Translate contentKey="generadorApp.profissionalComplexidadeAtual.idProfissional">Id Profissional</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'baixa' ? (
                        <th className="hand" onClick={this.sort('baixa')}>
                          <Translate contentKey="generadorApp.profissionalComplexidadeAtual.baixa">Baixa</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'media' ? (
                        <th className="hand" onClick={this.sort('media')}>
                          <Translate contentKey="generadorApp.profissionalComplexidadeAtual.media">Media</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'alta' ? (
                        <th className="hand" onClick={this.sort('alta')}>
                          <Translate contentKey="generadorApp.profissionalComplexidadeAtual.alta">Alta</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ventilacaoMecanica' ? (
                        <th className="hand" onClick={this.sort('ventilacaoMecanica')}>
                          <Translate contentKey="generadorApp.profissionalComplexidadeAtual.ventilacaoMecanica">
                            Ventilacao Mecanica
                          </Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'telemonitoramente' ? (
                        <th className="hand" onClick={this.sort('telemonitoramente')}>
                          <Translate contentKey="generadorApp.profissionalComplexidadeAtual.telemonitoramente">Telemonitoramente</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {profissionalComplexidadeAtualList.map((profissionalComplexidadeAtual, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${profissionalComplexidadeAtual.id}`} color="link" size="sm">
                            {profissionalComplexidadeAtual.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idProfissional' ? <td>{profissionalComplexidadeAtual.idProfissional}</td> : null}

                        {this.state.baseFilters !== 'baixa' ? <td>{profissionalComplexidadeAtual.baixa}</td> : null}

                        {this.state.baseFilters !== 'media' ? <td>{profissionalComplexidadeAtual.media}</td> : null}

                        {this.state.baseFilters !== 'alta' ? <td>{profissionalComplexidadeAtual.alta}</td> : null}

                        {this.state.baseFilters !== 'ventilacaoMecanica' ? (
                          <td>{profissionalComplexidadeAtual.ventilacaoMecanica}</td>
                        ) : null}

                        {this.state.baseFilters !== 'telemonitoramente' ? <td>{profissionalComplexidadeAtual.telemonitoramente}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button
                              tag={Link}
                              to={`${match.url}/${profissionalComplexidadeAtual.id}?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${profissionalComplexidadeAtual.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${profissionalComplexidadeAtual.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.profissionalComplexidadeAtual.home.notFound">
                    No Profissional Complexidade Atuals found
                  </Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={profissionalComplexidadeAtualList && profissionalComplexidadeAtualList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ profissionalComplexidadeAtual, ...storeState }: IRootState) => ({
  profissionalComplexidadeAtualList: profissionalComplexidadeAtual.entities,
  totalItems: profissionalComplexidadeAtual.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalComplexidadeAtual);
