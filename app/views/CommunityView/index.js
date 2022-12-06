import React from 'react';
import { View, SafeAreaView, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { toggleCrashReport as toggleCrashReportAction } from '../../lib/methods/crashReport';
import * as HeaderButton from '../../containers/HeaderButton';
import StatusBar from '../../containers/StatusBar';
import BrowserView from '../../containers/BrowserView';

import I18n from '../../i18n';
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

class CommunityView extends React.Component {
	static navigationOptions = ({ navigation, isMasterDetail }) => {
		const options = {
			title: I18n.t('Community')
		};
		if (isMasterDetail) {
			options.headerLeft = () => <HeaderButton.CloseModal navigation={navigation} testID='directory-view-close' />;
		} else {
			options.headerLeft = () => <HeaderButton.Drawer navigation={navigation} testID='directory-view-close' />;
		}
		return options;
	};

	static propTypes = {
		theme: PropTypes.string
	};

	render() {
		const { theme } = this.props;
		return (
			<SafeAreaView theme={theme} style={styles.container} testID='settings-view'>
				<StatusBar theme={theme} />
				<BrowserView url='https://app.milchjugend.ch/members/' />
			</SafeAreaView>
		);
	}
}

const mapStateToProps = state => ({
	server: state.server,
	isMasterDetail: state.app.isMasterDetail
});

export default connect(mapStateToProps)(withTheme(CommunityView));
