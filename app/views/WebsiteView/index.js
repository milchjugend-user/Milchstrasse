import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import StatusBar from '../../containers/StatusBar';
import BrowserView from '../../containers/BrowserView';

import { withTheme } from '../../theme';

import styles from './styles';

const ItemInfo = React.memo(({ info }) => (
	<View style={styles.infoContainer}>
		<Text style={styles.infoText}>{info}</Text>
	</View>
));
ItemInfo.propTypes = {
	info: PropTypes.string
};

class WebsiteView extends React.Component {
	static navigationOptions = ({ route }) => ({
		title: route.params.title || 'Milchstrasse'
	});

	static propTypes = {
		route: PropTypes.object,
		theme: PropTypes.string
	};

	render() {
		const { theme, route } = this.props;
		const { url } = route.params;
		return (
			<SafeAreaView theme={theme} style={styles.container} testID='settings-view'>
				<StatusBar theme={theme} />
				<BrowserView url={url} />
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
	server: state.server
});

export default connect(mapStateToProps)(withTheme(WebsiteView));
