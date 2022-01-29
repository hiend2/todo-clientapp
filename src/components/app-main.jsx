import React from 'react';
import PropTypes from 'prop-types';
import { observer, inject } from "mobx-react";
import { withStyles } from '@material-ui/core/styles';
import Header from './layout/header';
import Footer from './layout/footer';
import Content from './layout/content';
import LoadingSpinner from './loading-spinner';

const styles = () => ({
    root: {
        width: '100%',
    },
    content: {
        maxWidth: '960px',
        padding: '30px',
        margin: 'auto'
    }
});

@inject('rootStore')
@observer
class AppMain extends React.Component {
    render() {
        const { classes } = this.props;
        
        return (
            <div className={classes.root}>
                <Header />
                <div style={{ display: this.props.rootStore.isBusy ? 'block' : 'none' }} >
                    <LoadingSpinner />
                </div>
                <div className={classes.content}>
                    <Content />
                </div>
                <Footer />
            </div>
        );
    }
}

AppMain.propTypes = {
    classes: PropTypes.object.isRequired,
    rootStore: PropTypes.object
};

export default withStyles(styles)(AppMain);
