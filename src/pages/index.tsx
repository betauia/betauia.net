import React from "react"
import Container from 'react-bootstrap/Container';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Layout from '../components/layout';

import betaSecLogo from '../../assets/betasec-logo.png'

// TODO: Create logos for the other parts
// TODO: Fix text-header so it don't look so "strange"
// TODO: finish up css

export default function Home() {
	return <div>
		<Layout>
			<Jumbotron>
				<Container>
					<h1><strong>B</strong>ETA <strong>E</strong>ngineering and <strong>T</strong>echnology <strong>A</strong>ssociation</h1>
					<br></br>
					<h5>
						<ul className="listings">
							<li>This is the BETA website, as you can see it's still a work in progress.</li>
							<li>BETA is the student organization for the Computer Engineering and Cybersecurity Students at <a href="https://uia.no">UiA Grimstad</a>.</li>
						</ul>
					</h5>
				</Container>
			</Jumbotron>
			<Container>
				<Row>
					<Col>
						<a href="https://wiki.betauia.net/betasec"><img src={betaSecLogo} height="42" ></img></a>
					</Col>
					<Col>
						<a href="https://wiki.betauia.net/betasec"><img src={betaSecLogo} height="42" ></img></a>
					</Col>
					<Col>
						<a href="https://wiki.betauia.net/betasec"><img src={betaSecLogo} height="42" ></img></a>
					</Col>
					<Col>
						<a href="https://wiki.betauia.net/betasec"><img src={betaSecLogo} height="42" ></img></a>
					</Col>
				</Row>
			</Container>
			<br />
		</Layout>
	</div >
}
