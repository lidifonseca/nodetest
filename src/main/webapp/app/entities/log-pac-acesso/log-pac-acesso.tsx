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
import { getLogPacAcessoState, ILogPacAcessoBaseState, getEntities } from './log-pac-acesso.reducer';
import { ILogPacAcesso } from 'app/shared/model/log-pac-acesso.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface ILogPacAcessoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export interface ILogPacAcessoState extends ILogPacAcessoBaseState, IPaginationBaseState {}

export class LogPacAcesso extends React.Component<ILogPacAcessoProps, ILogPacAcessoState> {
  private myFormRef: any;

  constructor(props: ILogPacAcessoProps) {
    super(props);
    this.state = {
      ...getSortState(this.props.location, ITEMS_PER_PAGE),
      ...getLogPacAcessoState(this.props.location)
    };
  }

  componentDidMount() {
    this.getEntities();
  }

  cancelCourse = () => {
    this.setState(
      {
        idPaciente: '',
        profissional: '',
        token: '',
        ipLocal: '',
        inforAcesso: ''
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
      'idPaciente=' +
      this.state.idPaciente +
      '&' +
      'profissional=' +
      this.state.profissional +
      '&' +
      'token=' +
      this.state.token +
      '&' +
      'ipLocal=' +
      this.state.ipLocal +
      '&' +
      'inforAcesso=' +
      this.state.inforAcesso +
      '&' +
      ''
    );
  };

  handlePagination = activePage => this.setState({ activePage }, () => this.sortEntities());

  getEntities = () => {
    const { idPaciente, profissional, token, ipLocal, inforAcesso, activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(idPaciente, profissional, token, ipLocal, inforAcesso, activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { logPacAcessoList, match, totalItems } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Log Pac Acessos</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Log Pac Acessos</span>
              <Button id="togglerFilterLogPacAcesso" className="btn btn-primary float-right jh-create-entity">
                Filtros&nbsp;
                <FontAwesomeIcon icon="caret-down" />
              </Button>
              <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
                <FontAwesomeIcon icon="plus" />
                &nbsp;
                <Translate contentKey="generadorApp.logPacAcesso.home.createLabel">Create a new Log Pac Acesso</Translate>
              </Link>
            </h2>
          </PanelHeader>
          <PanelBody>
            <div className="table-responsive">
              <UncontrolledCollapse toggler="#togglerFilterLogPacAcesso">
                <CardBody>
                  <AvForm ref={el => (this.myFormRef = el)} id="form-filter" onSubmit={this.filterEntity}>
                    <div className="row mt-1 ml-3 mr-3">
                      <Col md="3">
                        <Row>
                          <Label id="idPacienteLabel" for="log-pac-acesso-idPaciente">
                            <Translate contentKey="generadorApp.logPacAcesso.idPaciente">Id Paciente</Translate>
                          </Label>
                          <AvInput type="string" name="idPaciente" id="log-pac-acesso-idPaciente" value={this.state.idPaciente} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="profissionalLabel" for="log-pac-acesso-profissional">
                            <Translate contentKey="generadorApp.logPacAcesso.profissional">Profissional</Translate>
                          </Label>

                          <AvInput type="text" name="profissional" id="log-pac-acesso-profissional" value={this.state.profissional} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="tokenLabel" for="log-pac-acesso-token">
                            <Translate contentKey="generadorApp.logPacAcesso.token">Token</Translate>
                          </Label>

                          <AvInput type="text" name="token" id="log-pac-acesso-token" value={this.state.token} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="ipLocalLabel" for="log-pac-acesso-ipLocal">
                            <Translate contentKey="generadorApp.logPacAcesso.ipLocal">Ip Local</Translate>
                          </Label>

                          <AvInput type="text" name="ipLocal" id="log-pac-acesso-ipLocal" value={this.state.ipLocal} />
                        </Row>
                      </Col>
                      <Col md="3">
                        <Row>
                          <Label id="inforAcessoLabel" for="log-pac-acesso-inforAcesso">
                            <Translate contentKey="generadorApp.logPacAcesso.inforAcesso">Infor Acesso</Translate>
                          </Label>

                          <AvInput type="text" name="inforAcesso" id="log-pac-acesso-inforAcesso" value={this.state.inforAcesso} />
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

              {logPacAcessoList && logPacAcessoList.length > 0 ? (
                <Table responsive aria-describedby="log-pac-acesso-heading" className={'table-hover table-striped mt-4'}>
                  <thead className={'thead-light'}>
                    <tr>
                      <th className="hand" onClick={this.sort('id')}>
                        <Translate contentKey="global.field.id">ID</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('idPaciente')}>
                        <Translate contentKey="generadorApp.logPacAcesso.idPaciente">Id Paciente</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('profissional')}>
                        <Translate contentKey="generadorApp.logPacAcesso.profissional">Profissional</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('token')}>
                        <Translate contentKey="generadorApp.logPacAcesso.token">Token</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('ipLocal')}>
                        <Translate contentKey="generadorApp.logPacAcesso.ipLocal">Ip Local</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>
                      <th className="hand" onClick={this.sort('inforAcesso')}>
                        <Translate contentKey="generadorApp.logPacAcesso.inforAcesso">Infor Acesso</Translate>
                        <FontAwesomeIcon icon="sort" />
                      </th>

                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    {logPacAcessoList.map((logPacAcesso, i) => (
                      <tr key={`entity-${i}`}>
                        <td>
                          <Button tag={Link} to={`${match.url}/${logPacAcesso.id}`} color="link" size="sm">
                            {logPacAcesso.id}
                          </Button>
                        </td>

                        <td>{logPacAcesso.idPaciente}</td>

                        <td>{logPacAcesso.profissional}</td>

                        <td>{logPacAcesso.token}</td>

                        <td>{logPacAcesso.ipLocal}</td>

                        <td>{logPacAcesso.inforAcesso}</td>

                        <td className="text-right">
                          <div className="btn-group flex-btn-group-container"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="alert alert-warning">
                  <Translate contentKey="generadorApp.logPacAcesso.home.notFound">No Log Pac Acessos found</Translate>
                </div>
              )}
            </div>
          </PanelBody>
          <PanelFooter>
            <div className={logPacAcessoList && logPacAcessoList.length > 0 ? '' : 'd-none'}>
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

const mapStateToProps = ({ logPacAcesso, ...storeState }: IRootState) => ({
  logPacAcessoList: logPacAcesso.entities,
  totalItems: logPacAcesso.totalItems
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LogPacAcesso);
