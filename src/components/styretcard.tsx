import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

export interface StyretInfo {
	Img: any,
	Name: string,
	Body: string
}

interface StyretCardProps {
	info: StyretInfo[]
}

export default function StyretCard(props: StyretCardProps) {
	const mapped = props.info.map((value: StyretInfo) => {
		return <Col>
				<Image src={value.Img} height="150" roundedCircle />
				<h3>{value.Name}</h3>
				<p>
					{value.Body}
				</p>
		</Col>
	});

	const perChunk = 4;
	const split = mapped.reduce((acc, value, index: number) => {
		const chunkIndex = Math.floor(index/perChunk);
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