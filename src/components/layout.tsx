import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faSnapchat, faFacebook, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';

import betaLogo from '../../assets/beta-logo.png'

export default function Layout({ children }) {
	return (<>
		<Navbar variant="dark" style={{ backgroundColor: "#0085ff" }}>
			<Navbar.Brand>
				<Link to="/">
					<Image className="beta-logo" src={betaLogo} height="38" />
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
					<Col><a href="https://www.instagram.com/betauia/"><FontAwesomeIcon icon={faInstagram} className="footer-icon" />Instagram</a></Col>
					<Col><a href="https://www.snapchat.com/add/betauia"><FontAwesomeIcon icon={faSnapchat} className="footer-icon" />Snapchat</a></Col>
					<Col><a href="https://www.facebook.com/beta.linjeforening"><FontAwesomeIcon icon={faFacebook} className="footer-icon" />Facebook</a></Col>
					<Col><a href="https://discord.com/invite/UQCPkZD"><FontAwesomeIcon icon={faDiscord} className="footer-icon" />Discord</a></Col>
					<Col><a href="https://github.com/beta-engineering-technology-association/"><FontAwesomeIcon icon={faGithub} className="footer-icon" />Github</a></Col>
				</Row>
			</Container>
		</Container>
	</>)
}
