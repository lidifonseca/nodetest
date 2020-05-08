/* eslint complexity: ["error", 100] */
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
import { getImagemProntuarioState, IImagemProntuarioBaseState, getEntities } from './imagem-prontuario.reducer';
import { IImagemProntuario } from 'app/shared/model/imagem-prontuario.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IImagemProntuarioProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface IImagemProntuarioState extends IImagemProntuarioBaseState, IPaginationBaseState {}

export class ImagemProntuario extends React.Component<IImagemProntuarioProps, IImagemProntuarioState> {
  private myFormRef: any;

  constructor(props: IImagemProntuarioProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getImagemProntuarioState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idProntuario: '',
        imagem: '',
        ativo: '',
        diretorio: ''
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
      'idProntuario=' +
      this.state.idProntuario +
      '&' +
      'imagem=' +
      this.state.imagem +
      '&' +
      'ativo=' +
      this.state.ativo +
      '&' +
      'diretorio=' +
      this.state.diretorio +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idProntuario, imagem, ativo, diretorio, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idProntuario, imagem, ativo, diretorio, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { imagemProntuarioList, match, totalItems } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <span className="page-header">Imagem Prontuarios</span>
          <Button id="togglerFilterImagemProntuario" className="btn btn-primary float-right jh-create-entity">
            <Translate contentKey="generadorApp.imagemProntuario.home.btn_filter_open">Filters</Translate>
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
            <Translate contentKey="generadorApp.imagemProntuario.home.createLabel">Create a new Imagem Prontuario</Translate>
          </Link>{' '}
          &nbsp;
        </h2>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Imagem Prontuarios</li>
        </ol>
        <Panel>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterImagemProntuario">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      {this.state.baseFilters !== 'idProntuario' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="idProntuarioLabel" for="imagem-prontuario-idProntuario">
                              <Translate contentKey="generadorApp.imagemProntuario.idProntuario">Id Prontuario</Translate>
                            </Label>

                            <AvInput type="text" name="idProntuario" id="imagem-prontuario-idProntuario" value={this.state.idProntuario} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'imagem' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="imagemLabel" for="imagem-prontuario-imagem">
                              <Translate contentKey="generadorApp.imagemProntuario.imagem">Imagem</Translate>
                            </Label>

                            <AvInput type="text" name="imagem" id="imagem-prontuario-imagem" value={this.state.imagem} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'ativo' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="ativoLabel" for="imagem-prontuario-ativo">
                              <Translate contentKey="generadorApp.imagemProntuario.ativo">Ativo</Translate>
                            </Label>
                            <AvInput type="string" name="ativo" id="imagem-prontuario-ativo" value={this.state.ativo} />
                          </Row>
                        </Col>
                      ) : null}

                      {this.state.baseFilters !== 'diretorio' ? (
                        <Col md="3">
                          <Row className="mr-1 mt-1">
                            <Label id="diretorioLabel" for="imagem-prontuario-diretorio">
                              <Translate contentKey="generadorApp.imagemProntuario.diretorio">Diretorio</Translate>
                            </Label>

                            <AvInput type="text" name="diretorio" id="imagem-prontuario-diretorio" value={this.state.diretorio} />
                          </Row>
                        </Col>
                      ) : null}
                    </div>

                    <div className="row mb-2 mr-4 justify-content-end">
                      <Button className="btn btn-success" type="submit">
                        <i className="fa fa-filter" aria-hidden={'true'}></i>
                        &nbsp;
                        <Translate contentKey="generadorApp.imagemProntuario.home.btn_filter">Filter</Translate>
                      </Button>
                      &nbsp;
                      <div className="btn btn-secondary hand" onClick={this.cancelCourse}>
                        <FontAwesomeIcon icon="trash-alt" />
                        &nbsp;
                        <Translate contentKey="generadorApp.imagemProntuario.home.btn_filter_clean">Clean</Translate>
                      </div>
                    </div>
                  </AvForm>
                </CardBody>
              </UncontrolledCollapse>

              {imagemProntuarioList && imagemProntuarioList.length > 0 ? (
                <Table responsive aria-describedby="imagem-prontuario-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      {this.state.baseFilters !== 'idProntuario' ? (
                        <th className="hand" onClick={this.sort('idProntuario')}>
                          <Translate contentKey="generadorApp.imagemProntuario.idProntuario">Id Prontuario</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'imagem' ? (
                        <th className="hand" onClick={this.sort('imagem')}>
                          <Translate contentKey="generadorApp.imagemProntuario.imagem">Imagem</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'ativo' ? (
                        <th className="hand" onClick={this.sort('ativo')}>
                          <Translate contentKey="generadorApp.imagemProntuario.ativo">Ativo</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}
                      {this.state.baseFilters !== 'diretorio' ? (
                        <th className="hand" onClick={this.sort('diretorio')}>
                          <Translate contentKey="generadorApp.imagemProntuario.diretorio">Diretorio</Translate>
                          <FontAwesomeIcon icon="sort" />
                        </th>
                      ) : null}

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {imagemProntuarioList.map((imagemProntuario, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${imagemProntuario.id}`} color="link" size="sm">
                            {imagemProntuario.id}
                          </Button>
                        </td>

                        {this.state.baseFilters !== 'idProntuario' ? <td>{imagemProntuario.idProntuario}</td> : null}

                        {this.state.baseFilters !== 'imagem' ? <td>{imagemProntuario.imagem}</td> : null}

                        {this.state.baseFilters !== 'ativo' ? <td>{imagemProntuario.ativo}</td> : null}

                        {this.state.baseFilters !== 'diretorio' ? <td>{imagemProntuario.diretorio}</td> : null}

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container">
                            <Button tag={Link} to={`${match.url}/${imagemProntuario.id}?${this.getFiltersURL()}`} color="info" size="sm">
                              <FontAwesomeIcon icon="eye" />{' '}
                              <span className="d-none d-md-inline">
                                <Translate contentKey="entity.action.view">View</Translate>
                              </span>
                            </Button>
                            <Button
                              tag={Link}
                              to={`${match.url}/${imagemProntuario.id}/edit?${this.getFiltersURL()}`}
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
                              to={`${match.url}/${imagemProntuario.id}/delete?${this.getFiltersURL()}`}
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
                  <Translate contentKey="generadorApp.imagemProntuario.home.notFound">No Imagem Prontuarios found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={imagemProntuarioList && imagemProntuarioList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ imagemProntuario, ...storeState }: IRootState) => ({
  imagemProntuarioList: imagemProntuario.entities,
  totalItems: imagemProntuario.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ImagemProntuario);
