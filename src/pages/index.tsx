import React from "react"
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from '../components/layout';

import betaSecLogo from '../../assets/betasec-logo.png'

// TODO: Create logos for the other parts
// TODO: make so that copyrigth text is properly centered

export default function Home() {
	return <div>
		<Layout>
			<Jumbotron className="frontpage-jumbo">
				<Container>
					<Row>
						<Col>
							<h1>BETA Engineering and Technology Association</h1>
						</Col>
						<Col xs={8}>
							<br></br>
							<h5>
								BETA is the student organization for the Computer Engineering and Cybersecurity Students at <a href="https://uia.no">UiA Grimstad</a>
							</h5>
						</Col>
					</Row>
				</Container>
			</Jumbotron>
			<Container>
				<Row className="center">
					<Col>
						<a href="https://wiki.betauia.net/betasec"><img src={betaSecLogo} className="wiki-image" ></img></a>
					</Col>
					<Col>
						<a href="https://wiki.betauia.net/betadev">Betadev</a>
					</Col>
					<Col>
						<a href="https://wiki.betauia.net/bedkom">Bedkom</a>
					</Col>
					<Col>
						<a href="https://wiki.betauia.net/eventkom">Eventkom</a>
					</Col>
					<Col>
						<a href="https://wiki.betauia.net/betalan">BetaLAN</a>
					</Col>
				</Row>
			</Container>
			<br />
		</Layout>
	</div >
}
