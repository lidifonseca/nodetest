import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Atendimento from './atendimento';
import AtendimentoDetail from './atendimento-detail';
import AtendimentoUpdate from './atendimento-update';
import AtendimentoDeleteDialog from './atendimento-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AtendimentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AtendimentoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AtendimentoDetail} />
      <ErrorBoundaryRoute path={match.url} component={Atendimento} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AtendimentoDeleteDialog} />
  </>
);

export default Routes;
