import React from 'react';
import Layout from '../components/layout';
import Container from 'react-bootstrap/Container';

import Logo from '../../assets/beta-logo.png';
import StyretCards, {Info} from '../components/styretcards';

const StyretInfo: Info[] = [
	{
		Img: Logo,
		Name: "Anders Godstad",
		Position: "Leder",
		Email: "leder@betauia.net"
	},
	{
		Img: Logo,
		Name: "Theodor Middleton",
		Position: "Nestleder",
		Email: "nestleder@betauia.net"
	},
	{
		Img: Logo,
		Name: "Vinh Hu",
		Position: "Økonomi ansvarlig",
		Email: "okonomi@betauia.net"
	},
	{
		Img: Logo,
		Name: "Ingrid Louise Husevåg-Kristensen",
		Position: "Bedriftskomité leder",
		Email: "bedrift@betauia.net"
	},
	{
		Img: Logo,
		Name: "Jon Inntveit",
		Position: "Eventkomité leder",
		Email: "event@betauia.net"
	},
	{
		Img: Logo,
		Name: "Adrian Risholm",
		Position: "BetaLAN leder",
		Email: "betalan@betauia.net",
	},
	{
		Img: Logo,
		Name: "Even Eilertsen",
		Position: "BetaSec leder",
		Email: "sikkerhet@betauia.net"
	}
]

export default function About() {
	return <>
	<Layout>
		<Container className="styret">
			<h1>Styret</h1>
			<StyretCards info={StyretInfo} />
		</Container>
	</Layout>
	</>
}