import React from "react"
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Layout from '../components/layout';

// TODO: Scale down beta logo image

export default function Home() {
  return <div>
		<Layout>
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
		</Layout>
    </div>
}
