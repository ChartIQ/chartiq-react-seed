/**
 * ThemeUI for switching and editing themes of the chart
 * @module components/UI/ThemeUI
 */

import React from 'react'
import ThemeModal from '../Modals/ThemeModal';
import MenuSelect from '../shared/MenuSelect';

/**
 * ThemeUI for switching and editing themes of the chart
 *
 * @class ThemeUI
 * @extends {React.Component}
 */
class ThemeUI extends React.Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		this.props.setThemeHelper(this.props.ciq)
		this.props.restoreThemes()
	}
	render(){
		return (
			<span>
				<ThemeModal {...this.props} />

				<MenuSelect hasButtons={true}
							options={this.props.themeList.filter(t=>t.name)}
							keyName='theme'
							name='name'
							handleOptionSelect={this.props.changeTheme}
							menuId='themeSelect'
							title='Select Theme'
							noButtons={['Night', '+ New Theme']}
							editItem={this.props.toggleThemeEditor}
							deleteItem={this.props.deleteTheme} />
			</span>
		);
	}
}

export default ThemeUI
