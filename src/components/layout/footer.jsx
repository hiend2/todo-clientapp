import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = ({
   container: {
        textAlign: 'center',
        backgroundColor: '#000',
        color: '#fff',
        paddingTop: '20px',
        paddingBottom: '20px',
        position: 'absolute',
        bottom: '0',
        width: '100%'
   }
});

class Footer extends React.Component {
    
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.container}>
                <Typography>© Hien Doan - 2022</Typography>
            </div>
        );
    }
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Footer);
