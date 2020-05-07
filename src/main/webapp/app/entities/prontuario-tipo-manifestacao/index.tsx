import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProntuarioTipoManifestacao from './prontuario-tipo-manifestacao';
import ProntuarioTipoManifestacaoDetail from './prontuario-tipo-manifestacao-detail';
import ProntuarioTipoManifestacaoRelatorioCSV from './relatorio/prontuario-tipo-manifestacao.csv';
import ProntuarioTipoManifestacaoUpdate from './prontuario-tipo-manifestacao-update';
import ProntuarioTipoManifestacaoDeleteDialog from './prontuario-tipo-manifestacao-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={ProntuarioTipoManifestacaoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProntuarioTipoManifestacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProntuarioTipoManifestacaoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProntuarioTipoManifestacaoDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProntuarioTipoManifestacao} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProntuarioTipoManifestacaoDeleteDialog} />
  </>
);

export default Routes;
