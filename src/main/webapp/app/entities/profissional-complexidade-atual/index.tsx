import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import ProfissionalComplexidadeAtual from './profissional-complexidade-atual';
import ProfissionalComplexidadeAtualDetail from './profissional-complexidade-atual-detail';
import ProfissionalComplexidadeAtualRelatorioCSV from './relatorio/profissional-complexidade-atual.csv';
import ProfissionalComplexidadeAtualUpdate from './profissional-complexidade-atual-update';
import ProfissionalComplexidadeAtualDeleteDialog from './profissional-complexidade-atual-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={ProfissionalComplexidadeAtualRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ProfissionalComplexidadeAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ProfissionalComplexidadeAtualUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ProfissionalComplexidadeAtualDetail} />
      <ErrorBoundaryRoute path={match.url} component={ProfissionalComplexidadeAtual} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ProfissionalComplexidadeAtualDeleteDialog} />
  </>
);

export default Routes;
