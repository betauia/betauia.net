import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

export interface Info {
	Img: any,
	Name: string,
	Position: string,
	Email: string,
	Body?: string
}

interface StyretCardsProps {
	info: Info[]
}

export default function StyretCards(props: StyretCardsProps) {
	const mapped: JSX.Element[] = props.info.map((value: Info) => {
		return <Col>
				<Image src={value.Img} width="150" roundedCircle />
				<h3>{value.Name}</h3>
				<h5>{value.Position}</h5>
				<p>
				<strong>Email: <a href={"mailto:"+value.Email}>{value.Email}</a></strong>
				<br />
					{value.Body}
				</p>
		</Col>
	});

	const perChunk: number = 4;
	const split: JSX.Element[][] = mapped.reduce((acc, value, index: number) => {
		const chunkIndex: number = Math.floor(index/perChunk);
		if(!acc[chunkIndex]){
			acc[chunkIndex] = [];
		}

		acc[chunkIndex].push(value);
		return acc;
	}, [])

	return <>{split.map((value) => {
		return <Row>
			{value}
		</Row>
	})}</>;
}