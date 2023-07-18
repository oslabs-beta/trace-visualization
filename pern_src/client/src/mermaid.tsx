import React, { Component } from 'react';
import mermaid from 'mermaid';
import './Sequence-diagram.css';

interface MermaidProps {
	chart: string;
}

class Mermaid extends Component<MermaidProps> {
	componentDidMount() {
		this.processMermaid();
	}

	componentDidUpdate(prevProps: MermaidProps) {
		if (prevProps.chart !== this.props.chart) {
			this.processMermaid();
		}
	}

	processMermaid() {
		const { chart } = this.props;

		// Check if mermaid is already initialized
		if (!mermaid.mermaidAPI) {
			mermaid.initialize({
				startOnLoad: false,
				htmlLabels: true,
				sequence: { showSequenceNumbers: true },
			});
		}

		const chartElement = document.getElementById('mermaidChart');

		if (chartElement) {
			chartElement.innerHTML = chart;
			delete chartElement.dataset.processed;
			mermaid.contentLoaded();
		}
	}

	render() {
		return <div id="mermaidChart" className="mermaid"></div>;
	}
}

export default Mermaid;
