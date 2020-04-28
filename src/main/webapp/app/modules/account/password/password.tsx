import React, { useState, useEffect } from 'react';
import { Translate, translate } from 'react-jhipster';
import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Row, Col, Button } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { savePassword, reset } from './password.reducer';
import {Link} from "react-router-dom";
import {Panel, PanelBody, PanelHeader} from "app/shared/layout/panel/panel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface IUserPasswordProps extends StateProps, DispatchProps {}

export const PasswordPage = (props: IUserPasswordProps) => {
  const [password, setPassword] = useState('');

  useEffect(() => {
    props.reset();
    props.getSession();
    return () => props.reset();
  }, []);

  const handleValidSubmit = (event, values) => {
    props.savePassword(values.currentPassword, values.newPassword);
  };

  const updatePassword = event => setPassword(event.target.value);

  return (
    <div>
      <ol className="breadcrumb float-xl-right">
        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
        <li className="breadcrumb-item">Conta</li>
        <li className="breadcrumb-item active">Trocar senha</li>
      </ol>
      <h2>
        <Translate contentKey="password.title" interpolate={{ username: props.account.login }}>
          Password for {props.account.login}
        </Translate>
      </h2>
      <Panel>
        <PanelHeader>Senha</PanelHeader>
        <PanelBody>
          <Row className="justify-content-center">
            <Col md="6">
              <AvForm id="password-form" onValidSubmit={handleValidSubmit}>
                <AvField
                  name="currentPassword"
                  label={translate('global.form.currentpassword.label')}
                  placeholder={translate('global.form.currentpassword.placeholder')}
                  type="password"
                  validate={{
                    required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') }
                  }}
                />
                <AvField
                  name="newPassword"
                  label={translate('global.form.newpassword.label')}
                  placeholder={translate('global.form.newpassword.placeholder')}
                  type="password"
                  validate={{
                    required: { value: true, errorMessage: translate('global.messages.validate.newpassword.required') },
                    minLength: { value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength') },
                    maxLength: { value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength') }
                  }}
                  onChange={updatePassword}
                />
                <PasswordStrengthBar password={password} />
                <AvField
                  name="confirmPassword"
                  label={translate('global.form.confirmpassword.label')}
                  placeholder={translate('global.form.confirmpassword.placeholder')}
                  type="password"
                  validate={{
                    required: {
                      value: true,
                      errorMessage: translate('global.messages.validate.confirmpassword.required')
                    },
                    minLength: {
                      value: 4,
                      errorMessage: translate('global.messages.validate.confirmpassword.minlength')
                    },
                    maxLength: {
                      value: 50,
                      errorMessage: translate('global.messages.validate.confirmpassword.maxlength')
                    },
                    match: {
                      value: 'newPassword',
                      errorMessage: translate('global.messages.error.dontmatch')
                    }
                  }}
                />
                <Row className="justify-content-md-center">
                  <Button color="success" type="submit">
                    <FontAwesomeIcon icon="save"/>
                    &nbsp;
                    <Translate contentKey="password.form.button">Save</Translate>
                  </Button>
                  &nbsp;&nbsp;
                  <Button tag={Link} to="/account/settings" replace color="dark">
                    <FontAwesomeIcon icon="arrow-left"/>
                    &nbsp;
                    <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.cancel">Cancel</Translate>
                  </span>
                  </Button>
                </Row>
              </AvForm>
            </Col>
          </Row>
        </PanelBody>
      </Panel>
    </div>
  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = { getSession, savePassword, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordPage);
