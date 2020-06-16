import React from "react"
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function Home() {
  return <div>
		<Navbar variant="dark" style={{backgroundColor: "#dddddd"}}>
			<Navbar.Brand>Brand link</Navbar.Brand>
		</Navbar>
	<Jumbotron>
		<Container>
			<h1>BETA - Beta Engineering and Technology Association</h1>
			<p>
				This is the BETA website, it is a work in progress.
			</p>
		</Container>
	</Jumbotron>
    <Container>
		<Row>
			<Col>
			<Card>
				<Card.Body>
					<Card.Title>EventKom</Card.Title>
					<Card.Text>Here is info</Card.Text>
				</Card.Body>
			</Card>
			</Col>
			<Col>
			<Card>
				<Card.Body>
					<Card.Title>Bedkom</Card.Title>
					<Card.Text>Here is info</Card.Text>
				</Card.Body>
			</Card>
			</Col>
			<Col>
			<Card>
				<Card.Body>
					<Card.Title>Betadev</Card.Title>
					<Card.Text>Here is info</Card.Text>
				</Card.Body>
			</Card>
			</Col>
			<Col>
			<Card>
				<Card.Body>
					<Card.Title>Security</Card.Title>
					<Card.Text>Here is info</Card.Text>
				</Card.Body>
			</Card>
			</Col>
		</Row>
		<hr />
		<Row>
			<Col>Instagram</Col>
			<Col>Instagram</Col>
			<Col>Instagram</Col>
			<Col>Instagram</Col>
			<Col>Instagram</Col>
			<Col>Instagram</Col>
			<Col>Instagram</Col>
		</Row>
	</Container>
    </div>
}
