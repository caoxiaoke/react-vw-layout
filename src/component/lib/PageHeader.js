import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'

import leftArrow from '../../images/larrow.png';

class PageHeader extends Component {
	constructor(props) {
		super(props)
		this.handlePageBack = this.handlePageBack.bind(this);
	}

	// 组件装载之后调用
	componentDidMount() {

	}

	handlePageBack() {
		this.props.history.goBack();
	}

	//渲染
	render() {
		return (
			<div>
				<div className="nav nav-list box box-align-center">
					<div className="box box-align-center nav-text-min-width">
						<img className="left-arrow" onClick={this.handlePageBack} src={leftArrow}/>
						<span className="nav-line"></span>
						<span className="nav-left-text">{this.props.title || ''}</span>
					</div>
				</div>
			</div>);
	}

	// 组件被卸载
	componentWillUnmount() {

	}
}

export default withRouter(PageHeader);
