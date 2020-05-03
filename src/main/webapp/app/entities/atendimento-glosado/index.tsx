import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AtendimentoGlosado from './atendimento-glosado';
import AtendimentoGlosadoDetail from './atendimento-glosado-detail';
import AtendimentoGlosadoUpdate from './atendimento-glosado-update';
import AtendimentoGlosadoDeleteDialog from './atendimento-glosado-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AtendimentoGlosadoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AtendimentoGlosadoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AtendimentoGlosadoDetail} />
      <ErrorBoundaryRoute path={match.url} component={AtendimentoGlosado} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AtendimentoGlosadoDeleteDialog} />
  </>
);

export default Routes;
