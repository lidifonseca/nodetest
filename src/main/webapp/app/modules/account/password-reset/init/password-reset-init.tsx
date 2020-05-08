import React from 'react';
import {Translate, translate} from 'react-jhipster';
import {connect} from 'react-redux';
import {AvForm, AvField} from 'availity-reactstrap-validation';
import {Button, Alert, Col, Row} from 'reactstrap';

import {IRootState} from 'app/shared/reducers';
import {handlePasswordResetInit, reset} from '../password-reset.reducer';
import {Redirect, RouteComponentProps} from 'react-router-dom';

export interface IPasswordResetInitProps extends StateProps, DispatchProps, RouteComponentProps<{}> {
}

export class PasswordResetInit extends React.Component<IPasswordResetInitProps> {
  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.handlePasswordResetInit(values.email);
    event.preventDefault();
  };

  render() {
    return (
      <div>
        {this.props.resetPasswordSuccess === true ? <Redirect to={'/'}/> : ''}
        <React.Fragment>
          <div className="login-cover">
            <div className="login-cover-image"
                 style={{backgroundImage: 'url(../../content/images/login-background.jpg)'}}></div>
            <div className="login-cover-bg"></div>
          </div>

          <div className="login login-v2">
            <div className="login-header">
              <div className="brand">
                { /* <span className="logo"></span> */}
                <h1>Saúde Concierge</h1>
                <h4>
                  <Translate contentKey="reset.finish.title">Reset password</Translate>
                </h4>
              </div>
              <div className="icon">
                <i className="fa fa-key"></i>
              </div>
            </div>
            <div className="login-content">
              <div className="margin-bottom-0">
                <div className="form-group m-b-20">
                  <Alert color="warning">
                    <p>
                      <Translate contentKey="reset.request.messages.info">Enter the email address you used to
                        register</Translate>
                    </p>
                  </Alert>
                  <AvForm onValidSubmit={this.handleValidSubmit}>
                    <AvField
                      name="email"
                      className="form-control form-control-lg"
                      label={translate('global.form.email.label')}
                      placeholder={translate('global.form.email.placeholder')}
                      type="email"
                      validate={{
                        required: {value: true, errorMessage: translate('global.messages.validate.email.required')},
                        minLength: {value: 5, errorMessage: translate('global.messages.validate.email.minlength')},
                        maxLength: {value: 254, errorMessage: translate('global.messages.validate.email.maxlength')}
                      }}
                    />
                    <Button className="btn btn-success btn-block btn-lg" type="submit">
                      <Translate contentKey="reset.request.form.button">Reset password</Translate>
                    </Button>
                  </AvForm>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = ({passwordReset}: IRootState) => ({
  resetPasswordFailure: passwordReset.resetPasswordFailure,
  resetPasswordSuccess: passwordReset.resetPasswordSuccess,
});

const mapDispatchToProps = {handlePasswordResetInit, reset};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetInit);
