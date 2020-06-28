import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Link } from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faSnapchat, faFacebook, faDiscord, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

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
				<Link to="/about">About</Link>
				<a href="https://wiki.betauia.net/beta" target="_blank">Wiki</a>
			</Nav>
		</Navbar>
		{children}
		<Container className="footer" fluid >
			<Container className="footer-breathing">
				<br />
				<Row>
					<Col>
						<div className="info-group">
							<Row><h4>Organization Name</h4></Row>
							<Row>BETA ENGINEERING & TECHNOLOGY ASSOCIATION</Row>
						</div>
						<div className="info-group">
							<Row><h4>Organization Number</h4></Row>
							<Row>913 777 417</Row>
						</div>
						<div className="info-group">
							<Row><h4>Address</h4></Row>
							<Row>Bluebox, BETA Jon Lilletuns vei 9, 4879 Grimstad</Row>
						</div>
						<div className="info-group">
							<Row><h4>Email</h4></Row>
							<Row>post@betauia.no</Row>
						</div>
					</Col>
					<Col>
						<Row className="contact_aliens">Socials</Row>
						<Row><a href="https://www.instagram.com/betauia/"><FontAwesomeIcon icon={faInstagram} height="16" className="footer-icon" />Instagram</a></Row>
						<Row><a href="https://www.snapchat.com/add/betauia"><FontAwesomeIcon icon={faSnapchat} height="16" className="footer-icon" />Snapchat</a></Row>
						<Row><a href="https://www.facebook.com/beta.linjeforening"><FontAwesomeIcon icon={faFacebook} height="16" className="footer-icon" />Facebook</a></Row>
						<Row><a href="https://discord.gg/U3N4q25"><FontAwesomeIcon icon={faDiscord} height="16" className="footer-icon" />Discord</a></Row>
						<Row><a href="https://github.com/beta-engineering-technology-association/"><FontAwesomeIcon icon={faGithub} height="16" className="footer-icon" />Github</a></Row>
						<Row><a href="https://www.linkedin.com/company/beta-engineering-technology-association"><FontAwesomeIcon icon={faLinkedin} height="16" className="footer-icon" />LinkedIn</a></Row>
					</Col>
				</Row>
				<Row>
					<Col className="copyright-notice">
						<Row>
							Beta Engineering &amp; Technology Association.
						</Row>
						<Row>
							Copyright &copy; 2008 - 2020 &nbsp;
						</Row>
					</Col>
				</Row>
			</Container>
		</Container>
	</>)
}
