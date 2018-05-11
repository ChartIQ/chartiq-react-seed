/**
 * Chart symbol selection
 * @module components/UI/ChartSymbol
 */

import React from 'react'

/**
 * Chart symbol selection component
 *
 * @class ChartSymbol
 * @extends {React.Component}
 */
class ChartSymbol extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			text: '',
			placeholder: 'Enter Symbol'
        }
        this.bindCorrectContext()
    }
    bindCorrectContext(){
        this.onOptionClick = this.onOptionClick.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }
	onOptionClick() {
		if (!this.props.ciq || !this.props.symbol) { return; }
		this.props.setSymbolAndSave(this.state.text)
	}
	onChange(event) {
		this.setState({
			text: event.target.value
		});
	}
	handleKeyPress(event) {
		let key = event.key;
		if (key == 'Enter') {
      this.onOptionClick()
      this.setState({text: ""})
		}
	}
	render() {
		return (
			<span className="symbol-frame">
        <input id="symbolInput" type="text" placeholder={this.state.placeholder}
          onChange={this.onChange} onKeyPress={this.handleKeyPress} value={this.state.text} />
				<div className="symbol-btn" onClick={this.onOptionClick}></div>
			</span>
		);
	}
}

export default ChartSymbol;
