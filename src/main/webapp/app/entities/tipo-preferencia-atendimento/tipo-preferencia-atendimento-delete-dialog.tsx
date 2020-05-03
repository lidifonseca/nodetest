import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ITipoPreferenciaAtendimento } from 'app/shared/model/tipo-preferencia-atendimento.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './tipo-preferencia-atendimento.reducer';

export interface ITipoPreferenciaAtendimentoDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class TipoPreferenciaAtendimentoDeleteDialog extends React.Component<ITipoPreferenciaAtendimentoDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.tipoPreferenciaAtendimentoEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { tipoPreferenciaAtendimentoEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.tipoPreferenciaAtendimento.delete.question">
          <Translate
            contentKey="generadorApp.tipoPreferenciaAtendimento.delete.question"
            interpolate={{ id: tipoPreferenciaAtendimentoEntity.id }}
          >
            Are you sure you want to delete this TipoPreferenciaAtendimento?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-tipoPreferenciaAtendimento" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ tipoPreferenciaAtendimento }: IRootState) => ({
  tipoPreferenciaAtendimentoEntity: tipoPreferenciaAtendimento.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoPreferenciaAtendimentoDeleteDialog);
