import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    width: "max-content",
    marginRight: "2rem"
  },
  appFrame: {
    height: 430,
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex",
    width: "100%"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`
  },
  "appBar-left": {
    marginLeft: drawerWidth
  },
  "appBar-right": {
    marginRight: drawerWidth
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  }
});

class Navbar extends React.Component {
  state = {
    anchor: "left",
    first: false,
    second: false
  };

  handleClick = () => {
    this.setState({ first: !this.state.first });
  };

  onClick = () => {
    this.setState({ second: !this.state.second });
  };

  render() {
    const { classes } = this.props;
    const { anchor } = this.state;

    const drawer = (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
        anchor={anchor}
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem button id="first" onClick={this.handleClick}>
            <ListItemText inset primary="Управление лигами" />
            {this.state.first ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.first} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button>
                <ListItemText>
                  <Link to="/leagues">Лиги</Link>
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText>
                  <Link to="/subleagues">Подлиги</Link>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
          <ListItem button>
            <ListItemText>
              <Link to="/franchise/add">Франшизы</Link>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <Link to="/stuff">Персонал</Link>
            </ListItemText>
          </ListItem>
          <ListItem button>
            <ListItemText>
              <Link to="/players">Игроки</Link>
            </ListItemText>
          </ListItem>

          <ListItem button id="second" onClick={this.onClick}>
            <ListItemText inset primary="Объединение" />
            {this.state.second ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.second} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button>
                <ListItemText>
                  <Link to="/merge">Запросы на объединение</Link>
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText>
                  <Link to="/merge/players">Объединение игроков</Link>
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemText>
                  <Link to="/merge/stuff">Объединение персонала</Link>
                </ListItemText>
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
    );

    let before = null;

    if (anchor === "left") {
      before = drawer;
    }

    return <div className={classes.root}>{before}</div>;
  }
}

export default withStyles(styles)(Navbar);
