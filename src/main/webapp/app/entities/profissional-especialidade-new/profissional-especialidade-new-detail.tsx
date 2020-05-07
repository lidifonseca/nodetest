import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import {
  getEntity,
  IProfissionalEspecialidadeNewBaseState,
  getProfissionalEspecialidadeNewState
} from './profissional-especialidade-new.reducer';
import { IProfissionalEspecialidadeNew } from 'app/shared/model/profissional-especialidade-new.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProfissionalEspecialidadeNewState {
  fieldsBase: IProfissionalEspecialidadeNewBaseState;
}

export interface IProfissionalEspecialidadeNewDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalEspecialidadeNewDetail extends React.Component<
  IProfissionalEspecialidadeNewDetailProps,
  IProfissionalEspecialidadeNewState
> {
  constructor(props: Readonly<IProfissionalEspecialidadeNewDetailProps>) {
    super(props);
    this.state = {
      ...this.state,
      fieldsBase: getProfissionalEspecialidadeNewState(this.props.location)
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { profissionalEspecialidadeNewEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Profissional Especialidade News</li>
          <li className="breadcrumb-item active">Profissional Especialidade News details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Profissional Especialidade News</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.profissionalEspecialidadeNew.detail.title">ProfissionalEspecialidadeNew</Translate>[
                  <b>{profissionalEspecialidadeNewEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idEspecialidade">
                            <Translate contentKey="generadorApp.profissionalEspecialidadeNew.idEspecialidade">Id Especialidade</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEspecialidadeNewEntity.idEspecialidade}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="idProfissional">
                            <Translate contentKey="generadorApp.profissionalEspecialidadeNew.idProfissional">Id Profissional</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{profissionalEspecialidadeNewEntity.idProfissional}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/profissional-especialidade-new" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button
                  tag={Link}
                  to={`/profissional-especialidade-new/${profissionalEspecialidadeNewEntity.id}/edit`}
                  replace
                  color="primary"
                >
                  <FontAwesomeIcon icon="pencil-alt" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.edit">Edit</Translate>
                  </span>
                </Button>
              </Col>
            </Row>
          </PanelBody>
        </Panel>
      </div>
    );
  }
}

const mapStateToProps = ({ profissionalEspecialidadeNew }: IRootState) => ({
  profissionalEspecialidadeNewEntity: profissionalEspecialidadeNew.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalEspecialidadeNewDetail);
