import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Link, RouteComponentProps} from 'react-router-dom';
import {Button, Label, Row, Col} from 'reactstrap';
import {AvForm, AvGroup, AvInput, AvField, AvFeedback} from 'availity-reactstrap-validation';
import {Translate, translate} from 'react-jhipster';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {locales, languages} from 'app/config/translation';
import {getUser, getRoles, updateUser, createUser, reset} from './user-management.reducer';
import {IRootState} from 'app/shared/reducers';
import {Panel, PanelBody, PanelHeader} from "app/shared/layout/panel/panel";

export interface IUserManagementUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ login: string }> {
}

export const UserManagementUpdate = (props: IUserManagementUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.login);

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getUser(props.match.params.login);
    }
    props.getRoles();
    return () => props.reset();
  }, []);

  const handleClose = () => {
    props.history.push('/admin/user-management');
  };

  const saveUser = (event, values) => {
    if (isNew) {
      props.createUser(values);
    } else {
      props.updateUser(values);
    }
    handleClose();
  };

  const isInvalid = false;
  const {user, loading, updating, roles} = props;

  return (
    <div>
      <ol className="breadcrumb float-xl-right">
        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
        <li className="breadcrumb-item"><Link to="/admin/user-management">Usuários</Link></li>
        {user.id ? (
          <li className="breadcrumb-item">Editar usuário</li>
        ) : (
          <li className="breadcrumb-item">Criar usuário</li>
          )}
      </ol>
      {user.id ? (
          <h1 className="page-header">Editar usuário [{user.login}]<small></small></h1>
      ) : (
          <h1 className="page-header">Criar novo usuário<small></small></h1>
      )}

      <Panel>
        {user.id ? (
          <PanelHeader>Editar usuário</PanelHeader>
        ) : (
          <PanelHeader>Criar usuário</PanelHeader>
        )}

        <PanelBody>
              <AvForm onValidSubmit={saveUser} className="form-horizontal">
                  <Row>
                    <Col md="6">
                      {user.id ? (
                        <AvGroup>
                          <Label for="id">
                            <Translate contentKey="global.field.id">ID</Translate>
                          </Label>
                          <AvField type="text" className="form-control" name="id" required readOnly value={user.id}/>
                        </AvGroup>
                      ) : null}
                      <AvGroup>
                        <Label for="login">
                          <Translate contentKey="userManagement.login">Login</Translate>
                        </Label>
                        <AvField
                          type="text"
                          className="form-control"
                          name="login"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: translate('register.messages.validate.login.required')
                            },
                            pattern: {
                              value: '^[_.@A-Za-z0-9-]*$',
                              errorMessage: translate('register.messages.validate.login.pattern')
                            },
                            minLength: {
                              value: 1,
                              errorMessage: translate('register.messages.validate.login.minlength')
                            },
                            maxLength: {
                              value: 50,
                              errorMessage: translate('register.messages.validate.login.maxlength')
                            }
                          }}
                          value={user.login}
                        />
                      </AvGroup>
                      <AvGroup>
                        <Label for="firstName">
                          <Translate contentKey="userManagement.firstName">First Name</Translate>
                        </Label>
                        <AvField
                          type="text"
                          className="form-control"
                          name="firstName"
                          validate={{
                            maxLength: {
                              value: 50,
                              errorMessage: translate('entity.validation.maxlength', {max: 50})
                            }
                          }}
                          value={user.firstName}
                        />
                      </AvGroup>
                      <AvGroup>
                        <Label for="lastName">
                          <Translate contentKey="userManagement.lastName">Last Name</Translate>
                        </Label>
                        <AvField
                          type="text"
                          className="form-control"
                          name="lastName"
                          validate={{
                            maxLength: {
                              value: 50,
                              errorMessage: translate('entity.validation.maxlength', {max: 50})
                            }
                          }}
                          value={user.lastName}
                        />
                        <AvFeedback>This field cannot be longer than 50 characters.</AvFeedback>
                      </AvGroup>
                    </Col>
                    <Col md="6">
                      <AvGroup>
                        <AvField
                          name="email"
                          label={translate('global.form.email.label')}
                          placeholder={translate('global.form.email.placeholder')}
                          type="email"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: translate('global.messages.validate.email.required')
                            },
                            email: {
                              errorMessage: translate('global.messages.validate.email.invalid')
                            },
                            minLength: {
                              value: 5,
                              errorMessage: translate('global.messages.validate.email.minlength')
                            },
                            maxLength: {
                              value: 254,
                              errorMessage: translate('global.messages.validate.email.maxlength')
                            }
                          }}
                          value={user.email}
                        />
                      </AvGroup>
                      <div className="checkbox checkbox-css m-b-20">
                        <AvGroup check inline>
                          <AvInput type="checkbox" name="activated" value={user.activated}/>{' '}
                          <Label for="activated">
                            <Translate contentKey="userManagement.activated">Activated</Translate>
                          </Label>
                        </AvGroup>
                      </div>
                      <AvGroup>
                        <Label for="authorities">
                          <Translate contentKey="userManagement.profiles">Language Key</Translate>
                        </Label>
                        <AvInput type="select" className="form-control" name="authorities" value={user.authorities}
                                 multiple>
                          {roles.map(role => (
                            <option value={role} key={role}>
                              {role}
                            </option>
                          ))}
                        </AvInput>
                      </AvGroup>
                    </Col>
                  </Row>
                &nbsp;
                &nbsp;
                <Row className="justify-content-md-center">
                  <Button color="success" type="submit" disabled={isInvalid || updating}>
                    <FontAwesomeIcon icon="save"/>
                    &nbsp;
                    <Translate contentKey="entity.action.save">Save</Translate>
                  </Button>
                  &nbsp;&nbsp;
                  <Button tag={Link} to="/admin/user-management" replace color="dark">
                    <FontAwesomeIcon icon="arrow-left"/>
                    &nbsp;
                    <Translate contentKey="entity.action.cancel">Cancel</Translate>

                  </Button>
                </Row>
              </AvForm>
        </PanelBody>
      </Panel>

    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  user: storeState.userManagement.user,
  roles: storeState.userManagement.authorities,
  loading: storeState.userManagement.loading,
  updating: storeState.userManagement.updating
});

const mapDispatchToProps = {getUser, getRoles, updateUser, createUser, reset};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserManagementUpdate);
