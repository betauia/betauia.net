import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faSnapchat, faFacebook, faDiscord } from '@fortawesome/free-brands-svg-icons';

export default function Layout({ children }) {
	return (<>
		<Navbar variant="dark" style={{ backgroundColor: "#0085ff" }}>
			<Navbar.Brand>
				<Link to="/">
					<Image className="beta-logo" src="/beta.jpg" height="38" />
				</Link>
			</Navbar.Brand>
			<Nav>
				<Link to="/">Home</Link>
				<a href="https://wiki.betauia.net/beta">About</a>
			</Nav>
		</Navbar>
		{children}
		<Container className="footer" fluid >
			<Container className="footer-breathing">
				<Row>
					<Col className="contact_aliens">Contact us on:</Col>
				</Row>
				<br />
				<Row>
					<Col><a href="https://www.instagram.com/betauia/"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></Col>
					<Col><a href="https://www.snapchat.com/add/betauia"><FontAwesomeIcon icon={faSnapchat} /> Snapchat</a></Col>
					<Col><a href="https://www.facebook.com/beta.linjeforening"><FontAwesomeIcon icon={faFacebook} /> Facebook</a></Col>
					<Col><a href="https://discord.com/invite/UQCPkZD"><FontAwesomeIcon icon={faDiscord} /> Discord</a></Col>
				</Row>
			</Container>
		</Container>
	</>)
}
