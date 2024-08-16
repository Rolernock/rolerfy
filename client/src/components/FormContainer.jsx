import { Container, Row, Col } from 'react-bootstrap'

export default function FormContainer({ children }) {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col xs={12} md={5}>
          {children}
        </Col>
      </Row>
    </Container>
  )
}
