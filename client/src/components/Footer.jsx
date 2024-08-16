import { Container, Row, Col } from 'react-bootstrap'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center mt-5'>
            <p>Rolerfy &copy; {currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
