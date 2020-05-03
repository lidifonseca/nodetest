import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AtendimentoAceite from './atendimento-aceite';
import AtendimentoAceiteDetail from './atendimento-aceite-detail';
import AtendimentoAceiteUpdate from './atendimento-aceite-update';
import AtendimentoAceiteDeleteDialog from './atendimento-aceite-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AtendimentoAceiteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AtendimentoAceiteUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AtendimentoAceiteDetail} />
      <ErrorBoundaryRoute path={match.url} component={AtendimentoAceite} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AtendimentoAceiteDeleteDialog} />
  </>
);

export default Routes;
