import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {Col, Row, Button} from 'reactstrap';
import {AvForm, AvField} from 'availity-reactstrap-validation';
import {Translate, translate, getUrlParameter} from 'react-jhipster';
import {Redirect, RouteComponentProps} from 'react-router-dom';

import {handlePasswordResetFinish, handlePasswordResetInit, reset} from '../password-reset.reducer';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import {IRootState} from "app/shared/reducers";

export interface IPasswordResetFinishProps extends DispatchProps, StateProps, RouteComponentProps<{ key: string }> {
}

export const PasswordResetFinishPage = (props: IPasswordResetFinishProps) => {
  const [password, setPassword] = useState('');
  const [key] = useState(getUrlParameter('key', props.location.search));

  useEffect(() => () => props.reset(), []);

  const handleValidSubmit = (event, values) => props.handlePasswordResetFinish(key, values.newPassword);

  const updatePassword = event => setPassword(event.target.value);

  const getResetForm = () => {
    return (
      <div>
        {props.resetPasswordSuccess === true ? <Redirect to={'/'}/> : ''}
        <React.Fragment>
          <AvForm onValidSubmit={handleValidSubmit}>
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
                <AvField
                  name="newPassword"
                  className="form-control-lg"
                  label={translate('global.form.newpassword.label')}
                  placeholder={translate('global.form.newpassword.placeholder')}
                  type="password"
                  validate={{
                    required: {value: true, errorMessage: translate('global.messages.validate.newpassword.required')},
                    minLength: {value: 4, errorMessage: translate('global.messages.validate.newpassword.minlength')},
                    maxLength: {value: 50, errorMessage: translate('global.messages.validate.newpassword.maxlength')}
                  }}
                  onChange={updatePassword}
                />
                <PasswordStrengthBar password={password}/>
                <AvField
                  name="confirmPassword"
                  className="form-control-lg m-b-20"
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
                    match: {value: 'newPassword', errorMessage: translate('global.messages.error.dontmatch')}
                  }}
                />
                <Button className="btn btn-success btn-block btn-lg" type="submit">
                  <Translate contentKey="reset.finish.form.button">Validate new password</Translate>
                </Button>
              </div>
            </div>
          </AvForm>
        </React.Fragment>
      </div>
    );
  };

  return (
    <div>
      <div>{key ? getResetForm() : null}</div>
    </div>
  );
};

const mapDispatchToProps = {handlePasswordResetFinish, reset};

const mapStateToProps = ({passwordReset}: IRootState) => ({
  resetPasswordFailure: passwordReset.resetPasswordFailure,
  resetPasswordSuccess: passwordReset.resetPasswordSuccess,
});

type DispatchProps = typeof mapDispatchToProps;
type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetFinishPage);
