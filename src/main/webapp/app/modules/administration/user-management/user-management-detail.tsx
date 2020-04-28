import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Row, Badge, Col, Label, Input} from 'reactstrap';
import {Translate, TextFormat} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {APP_DATE_FORMAT} from 'app/config/constants';
import {languages} from 'app/config/translation';
import {getUser} from './user-management.reducer';
import {IRootState} from 'app/shared/reducers';
import {Panel, PanelBody, PanelHeader} from "app/shared/layout/panel/panel";

export interface IUserManagementDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {
}

export const UserManagementDetail = (props: IUserManagementDetailProps) => {
  useEffect(() => {
    props.getUser(props.match.params.login);
  }, []);

  const { user } = props;

  return (
    <div>
      <ol className="breadcrumb float-xl-right">
        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
        <li className="breadcrumb-item"><Link to="/admin/user-management">Usuários</Link></li>
        <li className="breadcrumb-item">Detalhes do usuário</li>
      </ol>
      <h2>
        Detalhes do usuário &nbsp; [<b>{user.login}</b>]
      </h2>
      <Panel>
        <PanelHeader>Dados do usuário</PanelHeader>
        <PanelBody>
          <Row size="md">
            <Col md="4">
              <div>
                <Label>
                  <Translate contentKey="userManagement.login">Login</Translate>
                </Label>
                <div className="div-textformat">
                  &nbsp; {user.login} &nbsp;
                  {user.activated ? (
                    <Badge color="dark">
                      <Translate contentKey="userManagement.activated">Activated</Translate>
                    </Badge>
                  ) : (
                    <Badge color="danger">
                      <Translate contentKey="userManagement.deactivated">Deactivated</Translate>
                    </Badge>
                  )}
                </div>
              </div>
              &nbsp;
              &nbsp;
              <div>
                <Label>
                  <Translate contentKey="userManagement.firstName">First Name</Translate>
                </Label>
                <Input type="text" value={user.firstName} disabled/> &nbsp;
              </div>

              <div>
                <Label>
                  <Translate contentKey="userManagement.lastName">Last Name</Translate>
                </Label>
                <Input type="text" value={user.lastName} disabled/> &nbsp;
              </div>
            </Col>
            <Col md="4">
              <div>
                <Label>
                  <Translate contentKey="userManagement.email">Email</Translate>
                </Label>
                <Input type="text" value={user.email} disabled/> &nbsp;
              </div>
              <div>
                <Label>
                  <Translate contentKey="userManagement.createdBy">Created By</Translate>
                </Label>
                <Input type="text" value={user.createdBy} disabled/> &nbsp;
              </div>
              <div>
                <Label>
                  Data de criação
                </Label>
                <div className="div-textformat">
                  &nbsp;<TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
                </div>
              </div>
            </Col>
            <Col md="4">
              <div>
                <Label>
                  <Translate contentKey="userManagement.lastModifiedBy">Last Modified By</Translate>
                </Label>
                <Input type="text" value={user.lastModifiedBy} disabled/> &nbsp;
              </div>
              <div>
                <Label>
                  <Translate contentKey="userManagement.lastModifiedDate">Last Modified Date</Translate>
                </Label>
                <div className="div-textformat">
                  &nbsp;<TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid/>
                </div>
              </div>
              &nbsp;
              &nbsp;
              <div>
                <Label>
                  <Translate contentKey="userManagement.profiles">Profiles</Translate>
                </Label>
                <div className="div-textformat-textarea">
                <ul className="list-unstyled">
                  {user.authorities
                    ? user.authorities.map((authority, i) => (
                      <li key={`user-auth-${i}`}>
                        <Badge color="dark">{authority}</Badge>
                      </li>
                    ))
                    : null}
                </ul>
                </div>
              </div>
            </Col>
          </Row>
          &nbsp;
          <Row className="justify-content-md-center">
            <Button tag={Link} to="/admin/user-management" replace color="dark">
              <FontAwesomeIcon icon="arrow-left"/>{' '}
              &nbsp;
                <Translate contentKey="entity.action.back">Back</Translate>
            </Button>
          </Row>
        </PanelBody>
      </Panel>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user
});

const mapDispatchToProps = {getUser};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementDetail);
