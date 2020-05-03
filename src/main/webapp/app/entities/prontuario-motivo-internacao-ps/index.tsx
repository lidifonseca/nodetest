import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProntuarioMotivoInternacaoPs from './prontuario-motivo-internacao-ps';
import ProntuarioMotivoInternacaoPsDetail from './prontuario-motivo-internacao-ps-detail';
import ProntuarioMotivoInternacaoPsUpdate from './prontuario-motivo-internacao-ps-update';
import ProntuarioMotivoInternacaoPsDeleteDialog from './prontuario-motivo-internacao-ps-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProntuarioMotivoInternacaoPsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProntuarioMotivoInternacaoPsUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProntuarioMotivoInternacaoPsDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProntuarioMotivoInternacaoPs} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProntuarioMotivoInternacaoPsDeleteDialog} />
  </>
);

export default Routes;
