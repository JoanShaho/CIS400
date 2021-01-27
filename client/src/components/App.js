import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Switch,

} from 'react-router-dom';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import HomePage from './HomePage';
import ProfilePage from './ProfilePage';
import EditProfilePage from './EditProfilePage';
import RecommendationsPage from './RecommendationsPage';
import GroupPage from './GroupPage';

const test = ({ match }) => (
	<ProfilePage school = {match.params.school} course = {match.params.course} groupSize = {match.params.groupSize}></ProfilePage>
)

export default class App extends React.Component {
	render() {
		return (
			<div className="App">
				<Router>
					<Switch>
						<Route
							exact
							path="/"
							render={() => (
								<HomePage />
							)}
						/>
						<Route
							exact
							path="/LoginPage"
							render={() => (
								<LoginPage />
							)}
						/>
						<Route
							exact
							path="/SignUpPage"
							render={() => (
								<SignUpPage />
							)}
						/>
						<Route
							exact
							path="/ProfilePage/:username"
							component={ProfilePage}
						/>
						<Route
							exact
							path="/EditProfilePage"
							render={() => (
								<EditProfilePage />
							)}
						/>
						<Route
							exact
							path="/RecommendationsPage"
							render={() => (
								<RecommendationsPage />
							)}
						/>
						<Route
							exact
							path="/GroupPage"
							render={() => (
								<GroupPage />
							)}
						/>
					</Switch>
				</Router>
			</div>
		);
	}
}