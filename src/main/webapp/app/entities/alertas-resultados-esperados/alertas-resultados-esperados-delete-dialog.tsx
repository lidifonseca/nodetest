import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IAlertasResultadosEsperados } from 'app/shared/model/alertas-resultados-esperados.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './alertas-resultados-esperados.reducer';

export interface IAlertasResultadosEsperadosDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AlertasResultadosEsperadosDeleteDialog extends React.Component<IAlertasResultadosEsperadosDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.alertasResultadosEsperadosEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { alertasResultadosEsperadosEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.alertasResultadosEsperados.delete.question">
          <Translate
            contentKey="generadorApp.alertasResultadosEsperados.delete.question"
            interpolate={{ id: alertasResultadosEsperadosEntity.id }}
          >
            Are you sure you want to delete this AlertasResultadosEsperados?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-alertasResultadosEsperados" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ alertasResultadosEsperados }: IRootState) => ({
  alertasResultadosEsperadosEntity: alertasResultadosEsperados.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AlertasResultadosEsperadosDeleteDialog);
