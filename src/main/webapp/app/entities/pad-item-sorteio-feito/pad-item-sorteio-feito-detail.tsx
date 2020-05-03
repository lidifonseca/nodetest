import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Panel, PanelHeader, PanelBody, PanelFooter } from 'app/shared/layout/panel/panel.tsx';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pad-item-sorteio-feito.reducer';
import { IPadItemSorteioFeito } from 'app/shared/model/pad-item-sorteio-feito.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPadItemSorteioFeitoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PadItemSorteioFeitoDetail extends React.Component<IPadItemSorteioFeitoDetailProps> {
  constructor(props: Readonly<IPadItemSorteioFeitoDetailProps>) {
    super(props);
    this.state = {
      ...this.state
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { padItemSorteioFeitoEntity } = this.props;
    return (
      <div>
        <ol className="breadcrumb float-xl-right">
          <li className="breadcrumb-item">
            <Link to="/">Inicio</Link>
          </li>
          <li className="breadcrumb-item active">Pad Item Sorteio Feitos</li>
          <li className="breadcrumb-item active">Pad Item Sorteio Feitos details</li>
        </ol>
        <h1 className="page-header">&nbsp;&nbsp;</h1>
        <Panel>
          <PanelHeader>
            <h2 id="page-heading">
              <span className="page-header ml-3">Pad Item Sorteio Feitos</span>
            </h2>
          </PanelHeader>
          <PanelBody>
            <Row>
              <Col md="8">
                <h2>
                  <Translate contentKey="generadorApp.padItemSorteioFeito.detail.title">PadItemSorteioFeito</Translate>[
                  <b>{padItemSorteioFeitoEntity.id}</b>]
                </h2>
                <Row className="jh-entity-details">
                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <span id="sorteioFeito">
                            <Translate contentKey="generadorApp.padItemSorteioFeito.sorteioFeito">Sorteio Feito</Translate>
                          </span>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemSorteioFeitoEntity.sorteioFeito}</dd>
                      </Col>
                    </Row>
                  </Col>

                  <Col md="12">
                    <Row>
                      <Col md="3">
                        <dt>
                          <Translate contentKey="generadorApp.padItemSorteioFeito.idPadItem">Id Pad Item</Translate>
                        </dt>
                      </Col>
                      <Col md="9">
                        <dd>{padItemSorteioFeitoEntity.idPadItem ? padItemSorteioFeitoEntity.idPadItem.id : ''}</dd>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Button tag={Link} to="/pad-item-sorteio-feito" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />{' '}
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button tag={Link} to={`/pad-item-sorteio-feito/${padItemSorteioFeitoEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ padItemSorteioFeito }: IRootState) => ({
  padItemSorteioFeitoEntity: padItemSorteioFeito.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PadItemSorteioFeitoDetail);
