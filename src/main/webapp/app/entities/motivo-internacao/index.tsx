import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MotivoInternacao from './motivo-internacao';
import MotivoInternacaoDetail from './motivo-internacao-detail';
import MotivoInternacaoUpdate from './motivo-internacao-update';
import MotivoInternacaoDeleteDialog from './motivo-internacao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MotivoInternacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MotivoInternacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MotivoInternacaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={MotivoInternacao} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={MotivoInternacaoDeleteDialog} />
  </>
);

export default Routes;
