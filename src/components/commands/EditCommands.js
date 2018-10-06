import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { SketchPicker } from 'react-color';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { getCommandById, getCommandsByName, editCommand, clearCommands } from '../../actions/commandsActions';
import {
	getPlayersByName,
	getPlayersByNameCommand,
	addPlayerToCommand,
	delPlayerFromCommand,
	clearCommandPlayers,
	clearPlayers
} from '../../actions/playerActions';

import InputFile from '../common/InputFile';

import Messages from '../common/Messages';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
	root: {
		color: '#55a462',
		'&$checked': {
			color: '#55a462'
		}
	},
	checkbox: {
		color: '#43A047',
		'&$checked': {
			color: '#43A047'
		}
	},
	checked: {},
	wrap: {
		display: 'flex',
		justifyContent: 'space-between',
		flexWrap: 'wrap'
	},
	form: {
		width: '100%'
	},
	imgWrap: {
		display: 'flex'
	},
	img: {
		height: 42,
		marginLeft: '1rem'
	},
	input: {
		width: '100%',
		marginBottom: '.5rem'
	},
	select: {
		width: '100%'
	},
	listWrap: {
		position: 'relative',
		zIndex: 2
	},
	listWrapMin: {
		width: '30%',
		position: 'relative',
		zIndex: 2
	},
	list: {
		position: 'absolute',
		width: '100%',
		background: '#fff',
		boxShadow: '0 5px 1rem rgba(0,0,0,.5)',
		padding: 0
	},
	listItem: {
		padding: '8px',
		height: 'auto'
	},
	button: {
		margin: theme.spacing.unit,
		background: 'transparent',
		color: 'rgba(0,0,0,.5)',
		transition: '.3s',
		'&:hover, &:active': {
			backgroundColor: '#43A047',
			color: '#fff'
		}
	},
	submit: {
		backgroundColor: '#43A047',
		borderRadius: 40,
		color: '#fff',
		marginBottom: '1rem'
	},
	chip: {
		backgroundColor: '#effcf1',
		marginLeft: '1rem',
		'&:focus': {
			backgroundColor: '#effcf1'
		}
	},
	birthday: {
		marginTop: '1rem',
		width: '100%'
	},
	success: {
		backgroundColor: '#43A047'
	},
	error: {
		backgroundColor: '#ff5e5e'
	},
	color: {
		width: 30,
		height: 25,
		border: '1px solid rgba(0,0,0,.8)',
		padding: 10,
		borderRadius: 10,
		margin: '0 auto'
	},
	colorPicker: {
		position: 'fixed',
		zIndex: 5
	},
	colorBox: {
		margin: '0 2rem'
	},
	inputMin: {
		width: '30%',
		marginRight: '2rem'
	},
	playersItem: {
		border: '1px solid rgba(0,0,0,.5)'
	},
	cross: {
		color: '#ff5e5e',
		float: 'right'
	},
	pencil: {
		color: '#55a462',
		float: 'right'
	}
});

class EditCommands extends Component {
	state = {
		open: false,
		outShow: false,
		inShow: false,
		name: '',
		playerName: '',
		playerCommand: '',
		playerCommandId: '',
		playerNumber: '',
		playerId: '',
		double: '',
		doubleId: '',
		image: '',
		country: null,
		color_in: '',
		color_out: '',
		playersList: null,
		playersCommandsList: null,
		commandsList: null,
		command: null,
		region: '',
		status: '',
		city: ''
	};

	onChangeHandler = (e) => {
		if (e.target.name === 'playerName' && e.target.value.length >= 3) {
			this.props.getPlayersByName(`${e.target.value}&tied=1`);
		} else if (e.target.name === 'double' && e.target.value.length >= 3) {
			this.props.getCommandsByName(`${e.target.value}&sub=1`);
		} else if (e.target.name === 'playerCommand' && e.target.value.length >= 3) {
			this.props.getPlayersByNameCommand(e.target.value, this.props.match.params.id);
		}

		this.setState({
			[e.target.name]: e.target.value.replace(/[а-я]+/gi, '')
		});
	};

	onChangeNumberHandler = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onRadioChangeHandler = (e) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});
	};

	onChangeFileHandler = (e) => {
		const reader = new FileReader();
		if (e.target.files[0]) {
			this.setState({ ...this.state, openModal: true });
			reader.readAsDataURL(e.target.files[0]);
			reader.addEventListener(
				'load',
				() => {
					this.setState({
						image: reader.result
					});
				},
				false
			);
		}
	};

	onAddPlayerClick = (e) => {
		const addPlayer = {
			plId: this.state.playerCommandId,
			number: this.state.playerNumber
		};

		this.props.addPlayerToCommand(addPlayer, this.props.match.params.id);
	};

	onClickHandler = (type, player, id) => {
		if (type === 'player') {
			this.setState(
				{
					...this.state,
					playerName: player,
					playerId: id,
					playersList: null
				},
				this.props.clearPlayers()
			);
		} else if (type === 'command') {
			this.setState({
				...this.state,
				double: player,
				doubleId: id,
				commandsList: null
			});
		} else if (type === 'playerCommand') {
			this.setState({
				...this.state,
				playerCommand: player,
				playerCommandId: id,
				playersCommandsList: null
			});
		}
	};

	onSubmitHandler = (e) => {
		e.preventDefault();

		const editedCommand = {
			title: this.state.name,
			status: this.state.status,
			logo: this.state.image,
			color_in: this.state.color_in,
			color_out: this.state.color_out
		};

		if (this.state.playerId) {
			editedCommand.plId = this.state.playerId;
		} else if (this.state.doubleId) {
			editedCommand.sub_command_id = this.state.doubleId;
		}

		this.props.editCommand(this.props.match.url.replace(/\D/g, ''), editedCommand);
	};

	handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		if (this.props.messages) {
			this.setState({ open: false }, this.props.history.goBack());
		}

		this.setState({ open: false });
	};

	toggleChange = () => {
		this.setState({ status: !this.state.status });
	};

	handleChangeIn = (color) => {
		this.setState({ ...this.state, color_in: color.hex });
	};

	handleChangeOut = (color) => {
		this.setState({ ...this.state, color_out: color.hex });
	};

	onDeleteHandler = (id) => {
		this.props.delPlayerFromCommand(id, this.props.match.params.id);
	};

	componentDidMount = () => {
		this.props.getCommandById(this.props.match.url.replace(/\D/g, ''));
		this.props.clearCommands();
		this.props.clearCommandPlayers();
		this.props.clearPlayers();
	};

	componentWillReceiveProps = (nextProps) => {
		if (nextProps.errors || nextProps.messages) {
			this.setState({ ...this.state, open: true });
		} else if (nextProps.players.commandPlayers) {
			this.setState({
				...this.state,
				playersCommandsList: nextProps.players.commandPlayers
			});
		} else if (
			nextProps.commands.command &&
			nextProps.players.membersForMerge &&
			nextProps.commands.commands === null
		) {
			this.setState({
				...this.state,
				command: nextProps.commands.command,
				name: nextProps.commands.command.title,
				color_in: nextProps.commands.command.color_in,
				color_out: nextProps.commands.command.color_out,
				status: nextProps.commands.command.status === '1' ? true : false,
				playerName:
					nextProps.commands.command.name && nextProps.players.membersForMerge === null
						? nextProps.commands.command.name
						: '',
				double: nextProps.commands.command.subtitle ? nextProps.commands.command.subtitle : '',

				image: nextProps.commands.command.logo
			});
		} else if (nextProps.commands.commands) {
			this.setState({
				...this.state,
				commandsList: nextProps.commands.commands
			});
		}

		if (nextProps.players.membersForMerge) {
			this.setState({ ...this.state, playersList: nextProps.players.membersForMerge });
		}
	};

	render() {
		const { classes } = this.props;
		const { command } = this.props.commands;
		const { commands } = this.props;
		let numbersList;
		// let addedPlayersList;

		if (command) {
			numbersList = command.number.map((num) => (
				<MenuItem key={num} value={num}>
					№ {num}
				</MenuItem>
			));
		}

		return (
			<div className={classes.wrap}>
				<div className={classes.form}>
					<Button onClick={() => this.props.history.goBack()}>Назад</Button>
					<form className="player__form" onSubmit={this.onSubmitHandler}>
						<TextField
							label={<FormattedMessage id="commands.nameLabel" />}
							name="name"
							className={classes.input}
							value={this.state.name}
							onChange={this.onChangeHandler}
							margin="normal"
						/>
						<FormControlLabel
							control={
								<Checkbox
									checked={this.state.status}
									classes={{ root: classes.checkbox, checked: classes.checked }}
									onChange={this.toggleChange}
								/>
							}
							className={classes.input}
							label={<FormattedMessage id="commands.showLabel" />}
						/>
						<div className={classes.imgWrap}>
							<InputFile type="png" name="photo" onChange={this.onChangeFileHandler} />
							{this.state.image ? <img className={classes.img} src={this.state.image} alt="" /> : ''}
						</div>
						<div className={classes.imgWrap}>
							<div className={classes.colorBox}>
								Цвет формы (дома)
								<div
									className={classes.color}
									style={{ backgroundColor: this.state.color_in }}
									onClick={() => this.setState({ ...this.state, inShow: !this.state.inShow })}
								/>
								{this.state.inShow ? (
									<SketchPicker
										className={classes.colorPicker}
										color={this.state.color_in}
										onChange={this.handleChangeIn}
									/>
								) : (
									''
								)}
							</div>
							<div className={classes.colorBox}>
								Цвет формы (выезд)
								<div
									className={classes.color}
									style={{ backgroundColor: this.state.color_out }}
									onClick={() =>
										this.setState({
											...this.state,
											outShow: !this.state.outShow
										})}
								/>
								{this.state.outShow ? (
									<SketchPicker
										className={classes.colorPicker}
										name="color_out"
										color={this.state.color_out}
										onChange={this.handleChangeOut}
									/>
								) : (
									''
								)}
							</div>
						</div>
						<TextField
							label={<FormattedMessage id="commands.captainLabel" />}
							name="playerName"
							className={classes.input}
							value={this.state.playerName}
							onChange={this.onChangeHandler}
							margin="normal"
							autoComplete="off"
						/>
						<Paper className={classes.listWrap}>
							{this.state.playerName.length > 0 && this.state.playersList !== null ? (
								<List className={classes.list}>
									{this.state.playersList.map((player) => (
										<MenuItem
											key={player.plId}
											className={classes.listItem}
											component="div"
											onClick={this.onClickHandler.bind(this, 'player', player.name, player.plId)}
										>
											<span>
												<img
													src={player.photo}
													style={{ width: '50px', marginRight: 8 }}
													alt=""
												/>
											</span>
											<span>{player.name}</span>
										</MenuItem>
									))}
								</List>
							) : (
								''
							)}
						</Paper>

						<TextField
							label={<FormattedMessage id="commands.doubleLabel" />}
							name="double"
							className={classes.input}
							value={this.state.double}
							onChange={this.onChangeHandler}
							margin="normal"
							autoComplete="off"
						/>
						<Paper className={classes.listWrap}>
							{this.state.commandsList !== null ? (
								<List className={classes.list}>
									{this.state.commandsList.map((command) => (
										<MenuItem
											key={command.command_id}
											className={classes.listItem}
											component="div"
											onClick={this.onClickHandler.bind(
												this,
												'command',
												command.title,
												command.command_id
											)}
										>
											<span>
												<img
													src={command.logo}
													style={{ width: '50px', marginRight: 8 }}
													alt=""
												/>
											</span>
											<span>{command.title}</span>
										</MenuItem>
									))}
								</List>
							) : (
								''
							)}
						</Paper>

						<Button
							variant="contained"
							color="primary"
							size="large"
							type="submit"
							className={classes.submit}
						>
							{<FormattedMessage id="commands.submit" />}
						</Button>
					</form>
					<div style={{ display: 'flex' }}>
						<FormControl className={classes.inputMin}>
							<InputLabel htmlFor="playerNumber">Выберите номер игрока</InputLabel>
							<Select
								value={this.state.playerNumber}
								className={classes.select}
								onChange={this.onChangeNumberHandler}
								inputProps={{
									name: 'playerNumber',
									id: 'playerNumber'
								}}
							>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
								{numbersList}
							</Select>
						</FormControl>
						<div className={classes.listWrapMin}>
							<TextField
								label="Введите имя игрока"
								name="playerCommand"
								className={classes.input}
								value={this.state.playerCommand}
								onChange={this.onChangeHandler}
								margin="normal"
								autoComplete="off"
							/>
							<Paper className={classes.list}>
								{this.state.playersCommandsList ? (
									this.state.playersCommandsList.map((player) => (
										<MenuItem
											key={player.plId}
											value={player.plId}
											onClick={this.onClickHandler.bind(
												this,
												'playerCommand',
												`${player.surename} ${player.name} ${player.patronymic}`,
												player.plId
											)}
										>
											{`${player.surename} ${player.name} ${player.patronymic}`}
										</MenuItem>
									))
								) : (
									''
								)}
							</Paper>
						</div>
						<Button size="large" className={classes.submit} onClick={this.onAddPlayerClick}>
							Добавить
						</Button>
					</div>
					{this.state.command && this.state.command.players ? (
						<Table className={classes.table}>
							<TableHead>
								<TableRow>
									<TableCell>
										<FormattedMessage id="players.tableName" />
									</TableCell>
									<TableCell>
										<FormattedMessage id="players.tablePosition" />
									</TableCell>
									<TableCell>Номер игрока</TableCell>
									<TableCell>
										<FormattedMessage id="players.tableImage" />
									</TableCell>
									<TableCell />
								</TableRow>
							</TableHead>
							<TableBody>
								{this.state.command.players.map((player) => (
									<TableRow key={player.pId} style={{ cursor: 'pointer' }}>
										<TableCell component="th" scope="row">
											{`${player.surename} ${player.name} ${player.patronymic}`}
										</TableCell>
										<TableCell>
											<span>{player.position}</span>
										</TableCell>
										<TableCell>
											<span>{player.number}</span>
										</TableCell>
										<TableCell>
											<img src={player.photo} style={{ width: '50px' }} alt="" />
										</TableCell>
										<TableCell>
											<Button
												className={classes.cross}
												onClick={this.onDeleteHandler.bind(this, player.pId)}
												name={player.pId}
											>
												&#10006;
											</Button>
											{/* <Button
                        className={classes.pencil}
                        onClick={this.onPlayerClick.bind(this, player.pId)}
                        name={player.pId}
                      >
                        &#x270E;
                      </Button> */}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					) : (
						''
					)}
				</div>

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
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	location: state.location,
	players: state.players,
	commands: state.commands,
	errors: state.errors,
	messages: state.messages
});

export default compose(
	withStyles(styles),
	connect(mapStateToProps, {
		getCommandById,
		getCommandsByName,
		getPlayersByName,
		editCommand,
		clearCommands,
		getPlayersByNameCommand,
		addPlayerToCommand,
		delPlayerFromCommand,
		clearCommandPlayers,
		clearPlayers
	})
)(EditCommands);
