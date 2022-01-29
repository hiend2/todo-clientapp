import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, 
            Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
    appToolbar: {
        backgroundColor: '#0e3a6c',
        padding: '10px'
    },
    title: {
        fontSize: '30px',
        fontWeight: '600',
        color: '#fff'
    } 
});

class Header extends React.Component {
    render() {
        const { classes } = this.props;
        return (
            <AppBar>
                <Toolbar className={classes.appToolbar}>
                    <Typography className={classes.title} variant='h1'>To Do List</Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Header);
