import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';

import {
	getTourCommands,
	addGame,
	getGames,
	delGame,
	getAutoGames,
	getGamePlayers,
	addGamePlayers,
	clearAutoGames
} from '../../actions/tournamentActions';
import Messages from '../common/Messages';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';

import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import CalendarIcon from './icons/calendar.svg';
import TeamIcon from './icons/team.svg';

const styles = (theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between'
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
		border: '1px solid #55a462',
		color: '#000',
		textDecoration: 'none',
		borderRadius: 20,
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
		height: 'auto',
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
		alignItems: 'center',
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
	playersBtn: {
		width: 50,
		marginLeft: 10
	},
	checkbox: {
		color: '#43A047',
		'&$checked': {
			color: '#43A047'
		}
	},
	checked: {}
});

class Calendar extends Component {
	state = {
		open: false,
		openModal: false,
		tours: null,
		tour: '',
		commands: null,
		home: '',
		guest: '',
		value: 1,
		subtour: '',
		games: null,
		playersIn: null,
		playersOut: null,
		game: ''
	};

	handleChangeCheckbox = (i, players) => (event) => {
		let playersCopy = this.state[players];

		playersCopy[i].status = !playersCopy[i].status;

		this.setState({
			...this.state,
			[players]: playersCopy
		});
	};

	onLinkClickHandler = (path, id) => (e) => {
		e.stopPropagation();
		e.preventDefault();
		if (e.target.name === 'playersBtn' || e.target.parentNode.name === 'playersBtn') {
			this.props.getGamePlayers(id);
			this.setState({ ...this.state, openModal: true, game: id });
		} else {
			this.props.history.push(path);
		}
	};

	handleCancel = () => {
		this.setState({ openModal: false });
	};

	handleOk = () => {
		this.setState({ openModal: false });
		this.props.addGamePlayers(this.state.game, {
			listPlIn: this.state.playersIn,
			listPlOut: this.state.playersOut
		});
	};

	handleChange = (event, value) => {
		if (this.state.commands.length === 0) {
			event.preventDefault();
		} else {
			this.setState({
				...this.state,
				value,
				tours: Array.from({ length: (this.state.commands.length - 1) * value }, (v, k) => k + 1)
			});
		}
	};

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		this.setState({ open: false }, this.props.getGames(this.props.match.url.replace(/\D/g, '')));
	};

	onClickHandler = (e) => {
		e.preventDefault();
		if (!e.target.name) {
			this.props.delGame({ game_id: e.target.parentNode.name });
		} else {
			this.props.delGame({ game_id: e.target.name });
		}
	};

	onChangeHandler = (e) => {
		this.setState({ ...this.state, [e.target.name]: e.target.value });
	};

	onSubmitHandler = (e) => {
		e.preventDefault();

		const newGame = {
			sub_id: this.state.subtour,
			command_id_in: this.state.home,
			command_id_out: this.state.guest,
			tour: this.state.tour
		};

		this.props.addGame(newGame);
	};
	componentWillMount() {
		this.props.getTourCommands(this.props.match.url.replace(/\D/g, ''));
	}

	componentDidMount() {
		this.props.getGames(this.props.match.url.replace(/\D/g, ''));
		this.setState({
			...this.state,
			subtour: this.props.match.url.replace(/\D/g, '')
		});
	}

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.errors || nextProps.messages) {
			this.setState({ ...this.state, open: true });
		} else if (nextProps.tournaments.players) {
			this.setState({
				...this.state,
				playersIn: nextProps.tournaments.players.in,
				playersOut: nextProps.tournaments.players.out
			});
		} else if (nextProps.tournaments.commands !== null && nextProps.tournaments.games !== null) {
			this.setState({
				commands: nextProps.tournaments.commands,
				games: nextProps.tournaments.games.games,
				tours: Array.from({ length: nextProps.tournaments.games.tcount }, (v, k) => k + 1),
				games2: nextProps.tournaments.games.tour
			});
			let array = [];
			for (let key in nextProps.tournaments.games.tour) {
				for (let key2 in nextProps.tournaments.games.tour[key]) {
					array.push(nextProps.tournaments.games.tour[key][key2]);
				}
			}
		}
	};

	render() {
		const { classes } = this.props;

		let gamesTable;

		if (this.state.games2 && this.state.games2.length > 0) {
			gamesTable = this.state.games2.map((tour, i) => {
				let gamesArr = [];
				for (let key in tour) {
					gamesArr.push(
						<Link
							to={`/calendar/edit/${tour[key].game_id}`}
							key={key}
							style={{ textDecoration: 'none' }}
							onClick={this.onLinkClickHandler(`/calendar/edit/${tour[key].game_id}`, tour[key].game_id)}
						>
							<MenuItem className={classes.listItem} value={key}>
								<div className={classes.flex}>
									<div className={classes.flex} style={{ width: 200 }}>
										{`${tour[key].tour} тур`}
										<Button className={classes.playersBtn} name="playersBtn">
											<img
												src={TeamIcon}
												alt=""
												name="playersBtn"
												style={{
													verticalAlign: 'text-top',
													height: '25px',
													margin: '0 120px'
												}}
											/>
										</Button>
									</div>
									<div
										style={{
											display: 'flex',
											width: '75%',
											alignItems: 'center'
										}}
									>
										<div className={classes.flex} style={{ justifyContent: 'flex-end' }}>
											<span>{tour[key].in.title}</span>
											<Avatar alt="" src={tour[key].in.logo} />
										</div>

										{tour[key].date === null ? (
											<img
												src={CalendarIcon}
												alt=""
												style={{
													verticalAlign: 'text-top',
													height: '25px',
													margin: '0 120px'
												}}
											/>
										) : (
											<span>
												{new Date(+tour[key].date).toLocaleString('en-GB', {
													hour12: false
												})}
											</span>
										)}
										<div className={classes.flex}>
											<Avatar alt="" src={tour[key].out.logo} />
											<span>{tour[key].out.title}</span>
										</div>
									</div>
									<Button
										className={classes.cross}
										onClick={this.onClickHandler}
										name={tour[key].game_id}
									>
										&#10006;
									</Button>
								</div>
							</MenuItem>
						</Link>
					);
				}
				return gamesArr;
			});
			// console.log(gamesTable);
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
				<Button onClick={() => this.props.history.goBack()} style={{ marginBottom: '1rem' }}>
					Назад
				</Button>

				<BottomNavigation
					value={this.state.value}
					onChange={this.handleChange}
					showLabels
					className={classes.rounds}
				>
					<BottomNavigationAction
						classes={{ selected: classes.selected, root: classes.roundsBtn }}
						label="1 круг"
						value={1}
					/>
					<BottomNavigationAction
						classes={{ selected: classes.selected, root: classes.roundsBtn }}
						label="2 круг"
						value={2}
					/>
					<BottomNavigationAction
						classes={{ selected: classes.selected, root: classes.roundsBtn }}
						label="3 круг"
						value={3}
					/>
					<BottomNavigationAction
						classes={{ selected: classes.selected, root: classes.roundsBtn }}
						label="4 круг"
						value={4}
					/>
				</BottomNavigation>
				<form onSubmit={this.onSubmitHandler}>
					<div>
						<Button
							onClick={() =>
								this.props.getAutoGames(
									`${this.props.match.url.replace(/\D/g, '')}&r=${this.state.value}`
								)}
							style={{ marginBottom: '1rem' }}
							disabled={this.state.games}
						>
							Автоматически
						</Button>
						<Button
							onClick={() => this.props.clearAutoGames(this.props.match.url.replace(/\D/g, ''))}
							style={{ marginBottom: '1rem' }}
							disabled={this.state.games}
						>
							Очистить
						</Button>
					</div>
					{this.state.tours !== null ? (
						<FormControl className={classes.smSelect}>
							<InputLabel htmlFor="tour">
								<FormattedMessage id="subtournaments.tours" />
							</InputLabel>
							<Select
								value={this.state.tour}
								className={classes.select}
								onChange={this.onChangeHandler}
								inputProps={{
									name: 'tour',
									id: 'tour'
								}}
							>
								<MenuItem value="" />
								{this.state.tours.map((tour) => (
									<MenuItem value={tour} key={tour}>
										{tour}
										<FormattedMessage id="subtournaments.tours" />
									</MenuItem>
								))}
							</Select>
						</FormControl>
					) : (
						''
					)}
					{this.state.commands !== null ? (
						<FormControl className={classes.input}>
							<InputLabel htmlFor="home">
								<FormattedMessage id="subtournaments.homeCommands" />
							</InputLabel>
							<Select
								value={this.state.home}
								className={classes.select}
								onChange={this.onChangeHandler}
								inputProps={{
									name: 'home',
									id: 'home'
								}}
							>
								<MenuItem value="" />
								{this.state.commands.map((command) => (
									<MenuItem
										value={command.command_id}
										key={command.command_id}
										disabled={
											this.state.guest ? (
												this.state.guest === command.command_id
											) : (
												this.state.guest
											)
										}
									>
										<Avatar alt="" src={command.logo} style={{ marginRight: 8 }} />
										{command.title}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					) : (
						''
					)}
					{this.state.commands !== null ? (
						<FormControl className={classes.input}>
							<InputLabel htmlFor="guest">
								<FormattedMessage id="subtournaments.guestCommands" />
							</InputLabel>
							<Select
								value={this.state.guest}
								className={classes.select}
								onChange={this.onChangeHandler}
								inputProps={{
									name: 'guest',
									id: 'guest'
								}}
							>
								<MenuItem value="" />
								{this.state.commands.map((command) => (
									<MenuItem
										key={command.command_id}
										value={command.command_id}
										disabled={
											this.state.home ? this.state.home === command.command_id : this.state.home
										}
									>
										<Avatar alt="" src={command.logo} style={{ marginRight: 8 }} />
										{command.title}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					) : (
						''
					)}

					<Button size="large" type="submit" className={classes.submit}>
						<FormattedMessage id="subtournaments.submit" />
					</Button>
				</form>
				<div>
					{gamesTable ? (
						gamesTable.map((game, i) => (
							<div key={i}>
								{this.state.games2[i][0] ? (
									<h3 style={{ textAlign: 'center' }}>{this.state.games2[i][0].tour} тур</h3>
								) : (
									''
								)}
								<List>{game}</List>
							</div>
						))
					) : (
						''
					)}
				</div>
				<Dialog
					disableBackdropClick
					disableEscapeKeyDown
					fullWidth
					maxWidth="lg"
					aria-labelledby="confirmation-dialog-title"
					open={this.state.openModal}
				>
					<DialogTitle id="confirmation-dialog-title" style={{ textAlign: 'center' }}>
						<span style={{ fontSize: '2.5rem' }}>Изменить состав</span>
					</DialogTitle>
					<DialogContent>
						<div style={{ display: 'flex' }}>
							{this.state.playersIn ? (
								<List style={{ width: '50%' }}>
									<h2>Принимающая команда</h2>
									{this.state.playersIn.map((player, i) => (
										<MenuItem
											key={player.plId}
											className={classes.listItem}
											style={{ display: 'flex', justifyContent: 'space-between' }}
										>
											{`${player.name} (№${player.number} - ${player.type})`}
											{
												<FormControlLabel
													control={
														<Checkbox
															name="status"
															checked={player.status}
															onChange={this.handleChangeCheckbox(i, 'playersIn')}
															value={player.status}
															classes={{
																root: classes.checkbox,
																checked: classes.checked
															}}
														/>
													}
												/>
											}
										</MenuItem>
									))}
								</List>
							) : (
								''
							)}
							{this.state.playersOut ? (
								<List style={{ width: '50%' }}>
									<h2>Выездная команда</h2>
									{this.state.playersOut.map((player, i) => (
										<MenuItem
											key={player.plId}
											className={classes.listItem}
											style={{ display: 'flex', justifyContent: 'space-between' }}
										>
											{`${player.name} (№${player.number} - ${player.type})`}
											{
												<FormControlLabel
													control={
														<Checkbox
															name="status"
															checked={player.status}
															onChange={this.handleChangeCheckbox(i, 'playersOut')}
															value={player.status}
															classes={{
																root: classes.checkbox,
																checked: classes.checked
															}}
														/>
													}
												/>
											}
										</MenuItem>
									))}
								</List>
							) : (
								''
							)}
						</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={this.handleCancel} className={classes.button} color="primary">
							Отменить
						</Button>
						<Button onClick={this.handleOk} className={classes.button}>
							Подтвердить
						</Button>
					</DialogActions>
				</Dialog>
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
		getTourCommands,
		addGame,
		getGames,
		delGame,
		getAutoGames,
		getGamePlayers,
		addGamePlayers,
		clearAutoGames
	})
)(Calendar);
