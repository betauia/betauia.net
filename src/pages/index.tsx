import React from "react"
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faSnapchat, faFacebook, faDiscord } from '@fortawesome/free-brands-svg-icons';

// TODO: Scale down beta logo image

export default function Home() {
  return <div>
		<Navbar variant="dark" bg="dark">
			<Navbar.Brand href="#home">
				<h2 style={{justifyContent: "bottom"}}>
					<Image src="/beta-logo.png" width="36" height="36" style={{verticalAlign: "text-top", marginRight: "0.2em"}} rounded />
					BETA
					</h2>
				</Navbar.Brand>
			<Nav>
				<Nav.Link href="#about">About</Nav.Link>
				<Nav.Link href="#info">Info</Nav.Link>
			</Nav>
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
					<Card.Link><Button variant="link">Read more</Button></Card.Link>
				</Card.Body>
			</Card>
			</Col>
			<Col>
			<Card>
				<Card.Body>
					<Card.Title>Bedkom</Card.Title>
					<Card.Text>Here is info. Here is some more info. This is mostly to check out if the thingies do the thingy whith line endings.</Card.Text>
					<Card.Link><Button variant="link">Read more</Button></Card.Link>
				</Card.Body>
			</Card>
			</Col>
			<Col>
			<Card>
				<Card.Body>
					<Card.Title>Betadev</Card.Title>
					<Card.Text>Here is info</Card.Text>
					<Card.Link><Button variant="link">Read more</Button></Card.Link>
				</Card.Body>
			</Card>
			</Col>
			<Col>
			<Card>
				<Card.Body>
					<Card.Title>Security</Card.Title>
					<Card.Text>Here is info</Card.Text>
					<Card.Link><Button variant="link">Read more</Button></Card.Link>
				</Card.Body>
			</Card>
			</Col>
		</Row>
	</Container>
	<br />
	<Container fluid style={{padding: "2em 0", backgroundColor: "#eeeeee"}}>
		<Container style={{padding: "2em"}}>
		<Row>
			<Col style={{textDecoration: "underline"}}>Contact us on:</Col>
		</Row>
		<br />
		<Row>
			<Col><a href="#"><FontAwesomeIcon icon={faInstagram} />Instagram</a></Col>
			<Col><a href="#"><FontAwesomeIcon icon={faSnapchat} />Snapchat</a></Col>
			<Col><a href="#"><FontAwesomeIcon icon={faFacebook} />Facebook</a></Col>
			<Col><a href="#"><FontAwesomeIcon icon={faDiscord} />Discord</a></Col>
		</Row>
		</Container>
	</Container>
    </div>
}
