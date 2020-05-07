import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import AtendimentoSorteioFeito from './atendimento-sorteio-feito';
import AtendimentoSorteioFeitoDetail from './atendimento-sorteio-feito-detail';
import AtendimentoSorteioFeitoRelatorioCSV from './relatorio/atendimento-sorteio-feito.csv';
import AtendimentoSorteioFeitoUpdate from './atendimento-sorteio-feito-update';
import AtendimentoSorteioFeitoDeleteDialog from './atendimento-sorteio-feito-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={AtendimentoSorteioFeitoRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AtendimentoSorteioFeitoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AtendimentoSorteioFeitoUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AtendimentoSorteioFeitoDetail} />
      <ErrorBoundaryRoute path={match.url} component={AtendimentoSorteioFeito} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AtendimentoSorteioFeitoDeleteDialog} />
  </>
);

export default Routes;
