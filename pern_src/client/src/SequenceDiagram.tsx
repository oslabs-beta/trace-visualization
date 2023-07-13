import { Typography } from '@mui/material';
import { DataObject } from './Types';
import React, { useState, useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface Props {
	stackData: DataObject;
}

const SequenceDiagram = ({ stackData }: Props) => {
	const drawAreaRef = useRef<SVGSVGElement>(null);
	const [isLoading, setIsLoading] = useState(false); // Add loading state

	useEffect(() => {
		if (stackData) {
			const classes = ['User', 'Client', 'Server', 'Controller', 'Database'];

			const XPAD = 50;
			const YPAD = 20;
			const VERT_SPACE = 100;
			const VERT_PAD = 60;

			const CLASS_WIDTH = 80;
			const CLASS_HEIGHT = 40;
			const CLASS_LABEL_X_OFFSET = -25;
			const CLASS_LABEL_Y_OFFSET = 25;

			const MESSAGE_SPACE = 50;
			const MESSAGE_LABEL_X_OFFSET = -40;
			const MESSAGE_LABEL_Y_OFFSET = 70;
			const MESSAGE_ARROW_Y_OFFSET = 80;

			const CANVAS_WIDTH = 800;
			const CANVAS_HEIGHT = 600;

			const svg = d3.select(drawAreaRef.current).attr('width', CANVAS_WIDTH).attr('height', CANVAS_HEIGHT);

			const messages = [
				{ start: 0, end: 1, message: JSON.stringify(stackData.data.requestPayload) },
				{ start: 1, end: 2, message: stackData.data.httpMethod },
				{ start: 2, end: 4, message: stackData.data.sqlQuery },
				{ start: 4, end: 2, message: 'Return Data' },
				{ start: 2, end: 1, message: 'Return Data' },
				{ start: 1, end: 0, message: JSON.stringify(stackData.data.responseData) },
			];

			// Draw vertical lines
			svg
				.selectAll<SVGLineElement, string>('line')
				.data(classes)
				.enter()
				.append('line')
				.style('stroke', '#888')
				.attr('x1', (c, i) => XPAD + i * VERT_SPACE)
				.attr('y1', YPAD)
				.attr('x2', (c, i) => XPAD + i * VERT_SPACE)
				.attr('y2', YPAD + VERT_PAD + messages.length * MESSAGE_SPACE);

			// Draw classes
			svg
				.selectAll<SVGGElement, string>('g.class')
				.data(classes)
				.enter()
				.append('g')
				.attr('transform', (c, i) => `translate(${XPAD + i * VERT_SPACE},${YPAD})`)
				.attr('class', 'class')
				.append('rect')
				.attr('x', -CLASS_WIDTH / 2)
				.attr('y', 0)
				.attr('width', CLASS_WIDTH)
				.attr('height', CLASS_HEIGHT)
				.style('fill', '#CCC');

			// Draw class labels
			svg
				.selectAll<SVGTextElement, string>('text.class-label')
				.data(classes)
				.enter()
				.append('text')
				.text((c) => c)
				.attr('dx', 0) // Set dx to 0
				.attr('dy', CLASS_HEIGHT / 2 - 25) // Adjust dy to center the text vertically
				.attr('text-anchor', 'middle') // Center the text horizontally
				.attr('alignment-baseline', 'middle') // Center the text vertically
				.attr('transform', (c, i) => `translate(${XPAD + i * VERT_SPACE},${YPAD + CLASS_HEIGHT / 2 + 5})`) // Translate the text to the center of the class rectangle
				.attr('class', 'class-label');

			// Draw message arrows
			svg
				.selectAll<SVGLineElement, typeof messages>('line.message')
				.data(messages)
				.enter()
				.append('line')
				.style('stroke', 'black')
				.attr('x1', (m) => XPAD + m.start * VERT_SPACE)
				.attr('y1', (m, i) => YPAD + MESSAGE_ARROW_Y_OFFSET + i * MESSAGE_SPACE)
				.attr('x2', (m) => XPAD + m.end * VERT_SPACE)
				.attr('y2', (m, i) => YPAD + MESSAGE_ARROW_Y_OFFSET + i * MESSAGE_SPACE)
				.attr('marker-end', 'url(#end)');

			// Draw message labels
			const messageLabels = svg.selectAll<SVGTextElement, typeof messages>('text.message-label').data(messages);
			messageLabels
				.enter()
				.append('text')
				.merge(messageLabels)
				.text((m) => m.message)
				.attr('dx', MESSAGE_LABEL_X_OFFSET)
				.attr('dy', MESSAGE_LABEL_Y_OFFSET)
				.attr('transform', (m, i) => `translate(${XPAD + MESSAGE_LABEL_X_OFFSET + ((m.end - m.start) * VERT_SPACE) / 2 + m.start * VERT_SPACE},${YPAD + MESSAGE_LABEL_Y_OFFSET + i * MESSAGE_SPACE})`)
				.attr('class', 'message-label');

			// Arrow style
			svg
				.append('svg:defs')
				.append('svg:marker')
				.attr('id', 'end')
				.attr('viewBox', '0 -5 10 10')
				.attr('refX', 10)
				.attr('refY', 0)
				.attr('markerWidth', 10)
				.attr('markerHeight', 10)
				.attr('orient', 'auto')
				.append('svg:path')
				.attr('d', 'M0,-5L10,0L0,5');

			setIsLoading(false); // Mark loading as complete once the data is available
		}
	}, [stackData]);

	return <svg id="drawArea" ref={drawAreaRef}></svg>;
};

export default SequenceDiagram;
