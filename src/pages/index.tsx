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
					<h1><strong>B</strong>ETA <strong>E</strong>ngineering and <strong>T</strong>echnology <strong>A</strong>ssociation</h1>
					<br></br>
					<h5>
						<ul className="listings">
							<li>This is the BETA website, as you can see it's quite work in progress.</li>
							<li>BETA is the student organization, for the Computer Engineering and Cybersecurity Students at <a href="https://uia.no">UiA Grimstad</a>.</li>
							<ul className="listings">
								<li> Alpha </li>
								<li> Beta </li>
								<li> Gamma? </li>
							</ul>
						</ul>
					</h5>
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
								<Card.Title>BedKom</Card.Title>
								<Card.Text>Here is info. Here is some more info. This is mostly to check out if the thingies do the thingy whith line endings.</Card.Text>
								<Card.Link><Button variant="link">Read more</Button></Card.Link>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title>BetaDev</Card.Title>
								<Card.Text>Here is info</Card.Text>
								<Card.Link><Button variant="link">Read more</Button></Card.Link>
							</Card.Body>
						</Card>
					</Col>
					<Col>
						<Card>
							<Card.Body>
								<Card.Title>BetaSec</Card.Title>
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
