import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProntuarioMotivoManifestacao from './prontuario-motivo-manifestacao';
import ProntuarioMotivoManifestacaoDetail from './prontuario-motivo-manifestacao-detail';
import ProntuarioMotivoManifestacaoRelatorioCSV from './relatorio/prontuario-motivo-manifestacao.csv';
import ProntuarioMotivoManifestacaoUpdate from './prontuario-motivo-manifestacao-update';
import ProntuarioMotivoManifestacaoDeleteDialog from './prontuario-motivo-manifestacao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={ProntuarioMotivoManifestacaoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProntuarioMotivoManifestacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProntuarioMotivoManifestacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProntuarioMotivoManifestacaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProntuarioMotivoManifestacao} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProntuarioMotivoManifestacaoDeleteDialog} />
  </>
);

export default Routes;
