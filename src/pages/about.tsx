import React from 'react';
import Layout from '../components/layout';
import Container from 'react-bootstrap/Container';

import Logo from '../../assets/beta-logo.png';
import StyretCard, {StyretInfo} from '../components/styretcard';

const info: StyretInfo[] = [
	{
		Img: Logo,
		Name: "Even Eilertsen",
		Body: "Here is info about Even Eilertsen"
	},
	{
		Img: Logo,
		Name: "Even Eilertsen",
		Body: "Here is info about Even Eilertsen"
	},
	{
		Img: Logo,
		Name: "Even Eilertsen",
		Body: "Here is info about Even Eilertsen"
	},
	{
		Img: Logo,
		Name: "Even Eilertsen",
		Body: "Here is info about Even Eilertsen"
	},
	{
		Img: Logo,
		Name: "Even Eilertsen",
		Body: "Here is info about Even Eilertsen"
	},
	{
		Img: Logo,
		Name: "Even Eilertsen",
		Body: "Here is info about Even Eilertsen"
	},
]

export default function About() {
	return <>
	<Layout>
		<Container className="styret">
			<StyretCard info={info} />
		</Container>
	</Layout>
	</>
}