import React, {Component} from 'react';
import {Route, Switch, NavLink, Redirect, withRouter, Link} from 'react-router-dom'
import Loadable from 'react-loadable';
import PageA from './component/PageA';
import PageB from './component/PageB';
import PageC from './component/PageC';
import PageHeader from './component/lib/PageHeader';

import './css/lib/reset.css';
import './css/lib/common.css';
import './css/lib/pageheader.css';
import './App.css';

const PageAComponent = Loadable({
	loader: () => import('./component/PageA'),
	loading: PageA,
});
const PageBComponent = Loadable({
	loader: () => import('./component/PageB'),
	loading: PageB,
});
const PageCComponent = Loadable({
	loader: () => import('./component/PageC'),
	loading: PageC,
});
const HomeComponent = () => {
	return (<div>
		<PageHeader closeBrowser={true} title={'首页'}></PageHeader>
		<div className="list">
			<div className="list-row box box-pack-center">
				<NavLink to="/page-a">Link-To-PageA</NavLink>
			</div>
			<div className="list-row box box-pack-center">
				<NavLink to="/page-b">Link-To-PageB</NavLink>
			</div>
			<div className="list-row box box-pack-center">
				<NavLink to="/page-c">Link-To-PageC</NavLink>
			</div>
		</div>

		<div className="App">
			Hi React
		</div>
	</div>);
}

class App extends Component {
	render() {
		return (
			<div>
				<Switch>
					<Route path='/' exact component={HomeComponent}></Route>
					<Route path='/page-a' component={PageAComponent}></Route>
					<Route path='/page-b' component={PageBComponent}></Route>
					<Route path='/page-c' component={PageCComponent}></Route>
					<Redirect to={{
						pathname: '/',
						search: '?utm=your+face'
					}}/>
				</Switch>

			</div>
		);
	}
}

export default withRouter(App);
