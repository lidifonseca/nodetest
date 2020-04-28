import React, {useEffect} from 'react';
import {Button, Col, Alert, Row} from 'reactstrap';
import {connect} from 'react-redux';
import {Translate, translate} from 'react-jhipster';
import {AvForm, AvField} from 'availity-reactstrap-validation';

import {IRootState} from 'app/shared/reducers';
import {getSession} from 'app/shared/reducers/authentication';
import {saveAccountSettings, reset} from './settings.reducer';
import {Link} from "react-router-dom";
import {Panel, PanelBody, PanelHeader} from "app/shared/layout/panel/panel";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export interface IUserSettingsProps extends StateProps, DispatchProps {
}

export const SettingsPage = (props: IUserSettingsProps) => {
  useEffect(() => {
    props.getSession();
    return () => {
      props.reset();
    };
  }, []);

  const handleValidSubmit = (event, values) => {
    const account = {
      ...props.account,
      ...values
    };

    props.saveAccountSettings(account);
    event.persist();
  };

  return (
    <div>
      <ol className="breadcrumb float-xl-right">
        <li className="breadcrumb-item"><Link to="/">Inicio</Link></li>
        <li className="breadcrumb-item">Conta</li>
        <li className="breadcrumb-item active">Detalhes</li>
      </ol>
      <h2>
        <Translate contentKey="settings.title" interpolate={{username: props.account.login}}>
          User settings for {props.account.login}
        </Translate>
      </h2>
      <Panel>
        <PanelHeader>
          <span>Dados da conta</span>
          <Button tag={Link} to={"/account/password"} color="success" className="pull-right" size="sm">
            <i className="fa fa-key" aria-hidden={"true"}>&nbsp;</i>
            Senha
          </Button>
        </PanelHeader>
        <PanelBody>
          <AvForm id="settings-form" onValidSubmit={handleValidSubmit}>
            <Row size="md">
              <Col md="4">
                <AvField
                  className="form-control mb-md-3"
                  name="firstName"
                  label={translate('settings.form.firstname')}
                  id="firstName"
                  placeholder={translate('settings.form.firstname.placeholder')}
                  validate={{
                    required: {value: true, errorMessage: translate('settings.messages.validate.firstname.required')},
                    minLength: {value: 1, errorMessage: translate('settings.messages.validate.firstname.minlength')},
                    maxLength: {value: 50, errorMessage: translate('settings.messages.validate.firstname.maxlength')}
                  }}
                  value={props.account.firstName}
                />
              </Col>
              <Col md="4">
                <AvField
                  className="form-control mb-md-3"
                  name="lastName"
                  label={translate('settings.form.lastname')}
                  id="lastName"
                  placeholder={translate('settings.form.lastname.placeholder')}
                  validate={{
                    required: {value: true, errorMessage: translate('settings.messages.validate.lastname.required')},
                    minLength: {value: 1, errorMessage: translate('settings.messages.validate.lastname.minlength')},
                    maxLength: {value: 50, errorMessage: translate('settings.messages.validate.lastname.maxlength')}
                  }}
                  value={props.account.lastName}
                />
              </Col>
              <Col md="4">
                <AvField
                  className="form-control mb-md-3"
                  name="email"
                  label={translate('global.form.email.label')}
                  placeholder={translate('global.form.email.placeholder')}
                  type="email"
                  validate={{
                    required: {value: true, errorMessage: translate('global.messages.validate.email.required')},
                    minLength: {value: 5, errorMessage: translate('global.messages.validate.email.minlength')},
                    maxLength: {value: 254, errorMessage: translate('global.messages.validate.email.maxlength')}
                  }}
                  value={props.account.email}
                />
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Button color="success" type="submit">
                <FontAwesomeIcon icon="save"/>&nbsp;
                <Translate contentKey="settings.form.button">Save</Translate>
              </Button>
            </Row>
          </AvForm>
        </PanelBody>
      </Panel>

    </div>
  );
};

const mapStateToProps = ({authentication}: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated
});

const mapDispatchToProps = {getSession, saveAccountSettings, reset};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
