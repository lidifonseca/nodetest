import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { Translate, ICrudGetAction, ICrudDeleteAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IProfissionalDispositivoComplexidade } from 'app/shared/model/profissional-dispositivo-complexidade.model';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './profissional-dispositivo-complexidade.reducer';

export interface IProfissionalDispositivoComplexidadeDeleteDialogProps
  extends StateProps,
    DispatchProps,
    RouteComponentProps<{ id: string }> {}

export class ProfissionalDispositivoComplexidadeDeleteDialog extends React.Component<
  IProfissionalDispositivoComplexidadeDeleteDialogProps
> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.profissionalDispositivoComplexidadeEntity.id);
    this.handleClose(event);
  };

  handleClose = event => {
    event.stopPropagation();
    this.props.history.goBack();
  };

  render() {
    const { profissionalDispositivoComplexidadeEntity } = this.props;
    return (
      <Modal isOpen toggle={this.handleClose}>
        <ModalHeader toggle={this.handleClose}>
          <Translate contentKey="entity.delete.title">Confirm delete operation</Translate>
        </ModalHeader>
        <ModalBody id="generadorApp.profissionalDispositivoComplexidade.delete.question">
          <Translate
            contentKey="generadorApp.profissionalDispositivoComplexidade.delete.question"
            interpolate={{ id: profissionalDispositivoComplexidadeEntity.id }}
          >
            Are you sure you want to delete this ProfissionalDispositivoComplexidade?
          </Translate>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.handleClose}>
            <FontAwesomeIcon icon="ban" />
            &nbsp;
            <Translate contentKey="entity.action.cancel">Cancel</Translate>
          </Button>
          <Button id="jhi-confirm-delete-profissionalDispositivoComplexidade" color="danger" onClick={this.confirmDelete}>
            <FontAwesomeIcon icon="trash" />
            &nbsp;
            <Translate contentKey="entity.action.delete">Delete</Translate>
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = ({ profissionalDispositivoComplexidade }: IRootState) => ({
  profissionalDispositivoComplexidadeEntity: profissionalDispositivoComplexidade.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProfissionalDispositivoComplexidadeDeleteDialog);
