import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Atividades from './atividades';
import AtividadesDetail from './atividades-detail';
import AtividadesRelatorioCSV from './relatorio/atividades.csv';
import AtividadesUpdate from './atividades-update';
import AtividadesDeleteDialog from './atividades-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/relatorio/csv`} component={AtividadesRelatorioCSV} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={AtividadesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={AtividadesUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={AtividadesDetail} />
      <ErrorBoundaryRoute path={match.url} component={Atividades} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={AtividadesDeleteDialog} />
  </>
);

export default Routes;
