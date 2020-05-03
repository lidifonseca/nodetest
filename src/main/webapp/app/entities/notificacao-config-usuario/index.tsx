import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import NotificacaoConfigUsuario from './notificacao-config-usuario';
import NotificacaoConfigUsuarioDetail from './notificacao-config-usuario-detail';
import NotificacaoConfigUsuarioUpdate from './notificacao-config-usuario-update';
import NotificacaoConfigUsuarioDeleteDialog from './notificacao-config-usuario-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={NotificacaoConfigUsuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={NotificacaoConfigUsuarioUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={NotificacaoConfigUsuarioDetail} />
      <ErrorBoundaryRoute path={match.url} component={NotificacaoConfigUsuario} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={NotificacaoConfigUsuarioDeleteDialog} />
  </>
);

export default Routes;
