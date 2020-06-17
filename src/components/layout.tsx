import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {Link} from 'gatsby';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faSnapchat, faFacebook, faDiscord } from '@fortawesome/free-brands-svg-icons';

export default function Layout({children}){
	return(<>
		<Navbar variant="dark" style={{backgroundColor: "#0085ff"}}>
			<Navbar.Brand>
				<Link to="/">
					<Image src="/logo_test.jpg" width="128" height="38" style={{verticalAlign: "top", marginRight: "0.2em"}}  />
				</Link>
			</Navbar.Brand>
			<Nav>
				<Link to="/">Home</Link>
				<Link to="/about">About</Link>
			</Nav>
		</Navbar>
		{children}
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
	</>)
}
