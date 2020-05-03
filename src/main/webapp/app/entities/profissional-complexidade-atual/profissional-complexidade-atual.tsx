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
import { getEntities } from './profissional-complexidade-atual.reducer';
import { IProfissionalComplexidadeAtual } from 'app/shared/model/profissional-complexidade-atual.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IProfissionalComplexidadeAtualProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IProfissionalComplexidadeAtualBaseState {
  idProfissional: any;
  baixa: any;
  media: any;
  alta: any;
  ventilacaoMecanica: any;
  telemonitoramente: any;
  idUsuario: any;
  dataPost: any;
}
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
      ...this.getProfissionalComplexidadeAtualState(this.props.location)
    };
  }

  getProfissionalComplexidadeAtualState = (location): IProfissionalComplexidadeAtualBaseState => {
    const url = new URL(`http://localhost${location.search}`); // using a dummy url for parsing
    const idProfissional = url.searchParams.get('idProfissional') || '';
    const baixa = url.searchParams.get('baixa') || '';
    const media = url.searchParams.get('media') || '';
    const alta = url.searchParams.get('alta') || '';
    const ventilacaoMecanica = url.searchParams.get('ventilacaoMecanica') || '';
    const telemonitoramente = url.searchParams.get('telemonitoramente') || '';
    const idUsuario = url.searchParams.get('idUsuario') || '';
    const dataPost = url.searchParams.get('dataPost') || '';

    return {
      idProfissional,
      baixa,
      media,
      alta,
      ventilacaoMecanica,
      telemonitoramente,
      idUsuario,
      dataPost
    };
  };

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
        telemonitoramente: '',
        idUsuario: '',
        dataPost: ''
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
      'idUsuario=' +
      this.state.idUsuario +
      '&' +
      'dataPost=' +
      this.state.dataPost +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const {
      idProfissional,
      baixa,
      media,
      alta,
      ventilacaoMecanica,
      telemonitoramente,
      idUsuario,
      dataPost,
      activePage,
      itemsPerPage,
      sort,
      order
    } = this.state;
    this.props.getEntities(
      idProfissional,
      baixa,
      media,
      alta,
      ventilacaoMecanica,
      telemonitoramente,
      idUsuario,
      dataPost,
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
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
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
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="baixaLabel" for="profissional-complexidade-atual-baixa">
                            <Translate contentKey="generadorApp.profissionalComplexidadeAtual.baixa">Baixa</Translate>
                          </Label>
                          <AvInput type="string" name="baixa" id="profissional-complexidade-atual-baixa" value={this.state.baixa} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="mediaLabel" for="profissional-complexidade-atual-media">
                            <Translate contentKey="generadorApp.profissionalComplexidadeAtual.media">Media</Translate>
                          </Label>
                          <AvInput type="string" name="media" id="profissional-complexidade-atual-media" value={this.state.media} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="altaLabel" for="profissional-complexidade-atual-alta">
                            <Translate contentKey="generadorApp.profissionalComplexidadeAtual.alta">Alta</Translate>
                          </Label>
                          <AvInput type="string" name="alta" id="profissional-complexidade-atual-alta" value={this.state.alta} />
                        </Row>
                      </Col>
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
                            validate={{
                              required: { value: true, errorMessage: translate('entity.validation.required') },
                              number: { value: true, errorMessage: translate('entity.validation.number') }
                            }}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="idUsuarioLabel" for="profissional-complexidade-atual-idUsuario">
                            <Translate contentKey="generadorApp.profissionalComplexidadeAtual.idUsuario">Id Usuario</Translate>
                          </Label>
                          <AvInput
                            type="string"
                            name="idUsuario"
                            id="profissional-complexidade-atual-idUsuario"
                            value={this.state.idUsuario}
                          />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="dataPostLabel" for="profissional-complexidade-atual-dataPost">
                            <Translate contentKey="generadorApp.profissionalComplexidadeAtual.dataPost">Data Post</Translate>
                          </Label>
                          <AvInput
                            id="profissional-complexidade-atual-dataPost"
                            type="datetime-local"
                            className="form-control"
                            name="dataPost"
                            placeholder={'YYYY-MM-DD HH:mm'}
                            value={this.state.dataPost ? convertDateTimeFromServer(this.state.dataPost) : null}
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

              {profissionalComplexidadeAtualList && profissionalComplexidadeAtualList.length > 0 ? (
                <Table responsive aria-describedby="profissional-complexidade-atual-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idProfissional')}>
                        <Translate contentKey="generadorApp.profissionalComplexidadeAtual.idProfissional">Id Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('baixa')}>
                        <Translate contentKey="generadorApp.profissionalComplexidadeAtual.baixa">Baixa</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('media')}>
                        <Translate contentKey="generadorApp.profissionalComplexidadeAtual.media">Media</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('alta')}>
                        <Translate contentKey="generadorApp.profissionalComplexidadeAtual.alta">Alta</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ventilacaoMecanica')}>
                        <Translate contentKey="generadorApp.profissionalComplexidadeAtual.ventilacaoMecanica">
                          Ventilacao Mecanica
                        </Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('telemonitoramente')}>
                        <Translate contentKey="generadorApp.profissionalComplexidadeAtual.telemonitoramente">Telemonitoramente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idUsuario')}>
                        <Translate contentKey="generadorApp.profissionalComplexidadeAtual.idUsuario">Id Usuario</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('dataPost')}>
                        <Translate contentKey="generadorApp.profissionalComplexidadeAtual.dataPost">Data Post</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

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

                        <td>{profissionalComplexidadeAtual.idProfissional}</td>

                        <td>{profissionalComplexidadeAtual.baixa}</td>

                        <td>{profissionalComplexidadeAtual.media}</td>

                        <td>{profissionalComplexidadeAtual.alta}</td>

                        <td>{profissionalComplexidadeAtual.ventilacaoMecanica}</td>

                        <td>{profissionalComplexidadeAtual.telemonitoramente}</td>

                        <td>{profissionalComplexidadeAtual.idUsuario}</td>

                        <td>
                          <TextFormat type="date" value={profissionalComplexidadeAtual.dataPost} format={APP_DATE_FORMAT} />
                        </td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${profissionalComplexidadeAtual.id}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${profissionalComplexidadeAtual.id}/edit`} color="primary" size="sm">
                              <FontAwesomeIcon icon="pencil-alt" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.edit">Edit</Translate>
                              </span>
                            </Button>
                            <Button tag={Link} to={`${match.url}/${profissionalComplexidadeAtual.id}/delete`} color="danger" size="sm">
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
