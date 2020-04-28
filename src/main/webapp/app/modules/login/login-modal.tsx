import React from 'react';
import {translate} from 'react-jhipster';
import {Button, Label} from 'reactstrap';
import {AvForm, AvField, AvGroup, AvInput} from 'availity-reactstrap-validation';
import {Link} from 'react-router-dom';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
}

class LoginModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, {username, password, rememberMe}) => {
    const {handleLogin} = this.props;
    handleLogin(username, password, rememberMe);
  };

  render() {
    const {loginError, handleClose} = this.props;

    return (
      <div>
        <React.Fragment>
          <AvForm onSubmit={this.handleSubmit}>
            <div className="login-cover">
              <div className="login-cover-image"
                   style={{backgroundImage: 'url(../../content/images/confiancaprime-login-background.webp)'}}></div>
              <div className="login-cover-bg"></div>
            </div>

            <div className="login login-v2">
              <div className="login-header">
                <div className="brand">
                  { /* <span className="logo"></span> */}
                  <b>Confiança Prime</b>
                </div>
                <div className="icon">
                  <i className="fa fa-lock"></i>
                </div>
              </div>
              <div className="login-content">
                <div className="margin-bottom-0">
                  <div className="form-group m-b-20">
                    <AvField
                      name="username"
                      className="form-control form-control-lg"
                      label={translate('global.form.username.label')}
                      placeholder={translate('global.form.username.placeholder')}
                      required
                      errorMessage="O nome de usuário não pode estar vazio!"
                      autoFocus
                    />
                  </div>
                  <div className="form-group m-b-20">
                    <AvField
                      name="password"
                      type="password"
                      className="form-control form-control-lg"
                      label={translate('login.form.password')}
                      placeholder={translate('login.form.password.placeholder')}
                      required
                      errorMessage="A senha não pode estar vazia!"
                    />
                  </div>
                  <div className="checkbox checkbox-css m-b-20">
                    <AvGroup check inline>
                      <AvInput type="checkbox" name="rememberMe" value={true}/>
                      <Label className="form-check-label" for="rememberMe">
                        Lembrar senha
                      </Label>
                    </AvGroup>
                  </div>
                  <div>
                    <Button className="btn-success btn-block btn-lg" type="submit">
                      Entrar
                    </Button>
                    <div className="m-t-15">
                      Esqueceu sua senha? Clique <Link to={"/account/reset/request"}>aqui</Link> para recuperá-la.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AvForm>
        </React.Fragment>
      </div>
    );
  }
}

export default LoginModal;
