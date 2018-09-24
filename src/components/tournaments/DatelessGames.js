import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';

import { getDatelessGames, editDatelessGames } from '../../actions/tournamentActions';
import Messages from '../common/Messages';

import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from '@material-ui/core/Button';

import CalendarIcon from './icons/calendar.svg';

import { DateTimePicker } from 'material-ui-pickers';

const styles = (theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between'
	},
	form: {
		width: '70%',
		marginLeft: 'auto',
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '2rem'
	},
	checkbox: {
		color: '#43A047',
		'&$checked': {
			color: '#43A047'
		}
	},
	checked: {},
	input: {
		width: '40%',
		marginRight: 8
	},
	input_wrap: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '1rem'
	},
	select: {
		width: '100%',
		paddingTop: '1rem',
		'& div div': {
			display: 'flex'
		}
	},
	button: {
		display: 'block',
		marginBottom: '2rem',
		padding: '1rem 5rem',
		background: '#fff',
		borderRadius: 40,
		border: '1px solid #55a462',
		boxShadow: 'none',
		'&:hover,&:active': {
			background: '#55a462'
		},

		'&:hover a,&:active': {
			color: '#fff'
		}
	},
	button_link: {
		display: 'block',
		width: '100%',
		color: '#000',
		textDecoration: 'none',
		transition: '.3s'
	},
	submit: {
		backgroundColor: '#43A047',
		borderRadius: 40,
		color: '#fff',
		marginBottom: '1rem'
	},
	listItem: {
		border: '1px solid rgba(0,0,0,.2)'
	},
	rounds: {
		width: 500,
		marginBottom: '1rem'
	},
	roundsBtn: {
		border: '1px solid #43A047'
	},
	selected: {
		backgroundColor: '#43A047',
		color: '#fff'
	},
	flex: {
		display: 'flex',
		width: '100%',
		'& span': {
			padding: '0 3rem'
		}
	},
	smSelect: {
		width: 100,
		marginRight: 8
	},
	success: {
		backgroundColor: '#43A047'
	},
	error: {
		backgroundColor: '#ff5e5e'
	},
	cross: {
		color: '#ff5e5e',
		marginLeft: 'auto'
	},
	flex: {
		display: 'flex',
		width: '100%',
		'& span': {
			padding: '0 3rem'
		}
	}
});

class DatelessGames extends Component {
	state = {
		open: false,
		date: new Date(),
		selected: []
	};

	onChangeStartHandler = (date) => {
		this.setState({
			date: date._d
		});
	};

	onClickHandler = (e, id) => {
		const { selected } = this.state;
		const selectedIndex = selected.indexOf(id);
		let selectedArray = [];
		if (selectedIndex === -1) {
			selectedArray = selectedArray.concat(selected, id);
		} else if (selectedIndex === 0) {
			selectedArray = selectedArray.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			selectedArray = selectedArray.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			selectedArray = selectedArray.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
		}

		this.setState({ ...this.state, selected: selectedArray });
	};

	onSubmitHandler = (e) => {
		e.preventDefault();
		console.log(e);
		const editedGames = {
			gameList: this.state.selected,
			date: Date.parse(this.state.date)
		};

		this.props.editDatelessGames(editedGames);
	};

	isSelected = (id) => this.state.selected.indexOf(id) !== -1;

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		if (this.props.messages) {
			this.setState({ open: false }, this.props.getDatelessGames(this.props.match.params.id));
		}

		this.setState({ open: false });
	};

	componentDidMount = () => {
		this.props.getDatelessGames(this.props.match.params.id);
	};

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.errors || nextProps.messages) {
			this.setState({ ...this.state, open: true });
		}
	};

	render() {
		const { classes } = this.props;
		const { games } = this.props.tournaments;
		let gamesList;

		if (games) {
			gamesList = games.map(
				(game) =>
					game.length > 0
						? game.map((gameDetails) => {
								const isSelected = this.isSelected(gameDetails.game_id);
								return (
									<TableRow
										key={gameDetails.game_id}
										onClick={(e) => this.onClickHandler(e, gameDetails.game_id)}
									>
										<TableCell>
											<Checkbox checked={isSelected} />
										</TableCell>
										<TableCell>{gameDetails.tour}</TableCell>
										<TableCell>
											<div style={{ display: 'flex', width: '75%' }}>
												<div
													className={classes.flex}
													style={{
														justifyContent: 'flex-end',
														marginRight: '2rem'
													}}
												>
													<span>{gameDetails.in.title}</span>
													<Avatar alt="" src={gameDetails.in.logo} />
												</div>
												:
												<div
													className={classes.flex}
													style={{
														marginLeft: '2rem'
													}}
												>
													<Avatar alt="" src={gameDetails.out.logo} />
													<span>{gameDetails.out.title}</span>
												</div>
											</div>
											{/* {gameDetails.in.title} : {gameDetails.out.title} */}
										</TableCell>
									</TableRow>
								);
							})
						: ''
			);
		}

		return (
			<div>
				{this.props.errors ? (
					<Messages
						open={this.state.open}
						message={this.props.errors}
						onClose={this.handleClose}
						classes={classes.error}
					/>
				) : this.props.messages ? (
					<Messages
						open={this.state.open}
						message={this.props.messages}
						onClose={this.handleClose}
						classes={classes.success}
					/>
				) : (
					''
				)}
				<div>
					<Button onClick={() => this.props.history.goBack()} className={classes.button}>
						Назад
					</Button>

					<form onSubmit={this.onSubmitHandler} className={classes.form}>
						<MuiPickersUtilsProvider utils={MomentUtils}>
							<DateTimePicker
								keyboard
								name="date"
								value={this.state.date}
								onChange={this.onChangeStartHandler}
								label="Выберите дату"
							/>
						</MuiPickersUtilsProvider>
						<Button size="large" type="submit" className={classes.submit}>
							<FormattedMessage id="seasons.submit" />
						</Button>
					</form>
					<Paper className={classes.root}>
						<Table hover className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell />
									<TableCell>Тур</TableCell>
									<TableCell>Игра</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>{gamesList}</TableBody>
						</Table>
					</Paper>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	tournaments: state.tournaments,
	errors: state.errors,
	messages: state.messages
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps, {
		getDatelessGames,
		editDatelessGames
	})
)(DatelessGames);
