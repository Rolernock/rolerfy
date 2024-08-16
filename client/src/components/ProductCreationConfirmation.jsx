import { Button, Modal } from 'react-bootstrap'

export default function ProductCreationConfirmation({
  show,
  handleClose,
  handleConfirm
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Creation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to create a new product?</Modal.Body>
      <Modal.Footer>
        <Button className='btn-color' onClick={handleClose}>
          Cancel
        </Button>
        <Button variant='info' onClick={handleConfirm}>
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
