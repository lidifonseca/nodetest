import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IProfissionalStatusAtualNew } from 'app/shared/model/profissional-status-atual-new.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './profissional-status-atual-new.reducer';

export interface IProfissionalStatusAtualNewDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ProfissionalStatusAtualNewDeleteDialog extends React.Component<IProfissionalStatusAtualNewDeleteDialogProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.profissionalStatusAtualNewEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { profissionalStatusAtualNewEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.profissionalStatusAtualNew.delete.question">
          <Translate
            contentKey="generadorApp.profissionalStatusAtualNew.delete.question"
            interpolate={{ id: profissionalStatusAtualNewEntity.id }}
          >
            Are you sure you want to delete this ProfissionalStatusAtualNew?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-profissionalStatusAtualNew" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ profissionalStatusAtualNew }: IRootState) => ({
  profissionalStatusAtualNewEntity: profissionalStatusAtualNew.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalStatusAtualNewDeleteDialog);
