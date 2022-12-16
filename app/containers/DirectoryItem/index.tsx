import React from 'react';
import { Text, View, ViewStyle } from 'react-native';

import { CustomIcon } from '../CustomIcon';
import Touch from '../Touch';
import Avatar from '../Avatar';
import RoomTypeIcon from '../RoomTypeIcon';
import styles, { ROW_HEIGHT } from './styles';
import { themes } from '../../lib/constants';
import { TSupportedThemes, useTheme } from '../../theme';

export { ROW_HEIGHT };

interface IDirectoryItemLabel {
	text?: string;
	theme: TSupportedThemes;
}

interface IDirectoryItem {
	title: string;
	description?: string;
	avatar?: string;
	type: string;
	onPress(): void;
	testID: string;
	style?: ViewStyle;
	rightLabel?: string;
	userCount: number;
	onPressMembers: () => void;
	rid?: string;
	teamMain?: boolean;
}

const DirectoryItemLabel = React.memo(({ text, theme }: IDirectoryItemLabel) => {
	if (!text) {
		return null;
	}
	return <Text style={[styles.directoryItemLabel, { color: themes[theme].auxiliaryText }]}>{text}</Text>;
});

const DirectoryItem = ({
	title,
	description,
	avatar,
	onPress,
	testID,
	style,
	rightLabel,
	userCount,
	onPressMembers,
	type,
	rid,
	teamMain
}: IDirectoryItem): React.ReactElement => {
	const { theme } = useTheme();
	return (
		<Touch onPress={onPress} style={{ backgroundColor: themes[theme].backgroundColor }} testID={testID}>
			<View style={[styles.directoryItemContainer, styles.directoryItemButton, style]}>
				<Avatar text={avatar} size={30} type={type} rid={rid} style={styles.directoryItemAvatar} />
				<View style={styles.directoryItemTextContainer}>
					<View style={styles.directoryItemTextTitle}>
						{type !== 'd' ? <RoomTypeIcon type={type} teamMain={teamMain} /> : null}
						<Text style={[styles.directoryItemName, { color: themes[theme].titleText }]} numberOfLines={1}>
							{title}
						</Text>
					</View>
					{description ? (
						<Text style={[styles.directoryItemUsername, { color: themes[theme].auxiliaryText }]} numberOfLines={1}>
							{description}
						</Text>
					) : null}
				</View>
				<DirectoryItemLabel text={rightLabel} theme={theme} />
				{/*
				// Inactive changes for Milchstrasse: Shortcut to memberlist for a given channel
				{type === 'c' ? (
					<Touch
						onPress={() => onPressMembers()}
						style={[styles.directoryItemMembersButton, { backgroundColor: themes[theme].backgroundColor }]}
						testID={testID}
					>
						<Text style={[styles.directoryItemLabelMembers, { color: themes[theme].tintColor }]}>{userCount}</Text>
						<CustomIcon style={[{ color: themes[theme].tintColor }]} size={20} name='team' color={themes[theme].tintColor} />
					</Touch>
				) : (
					<DirectoryItemLabel text={rightLabel} theme={theme} />
				)}
				*/}
			</View>
		</Touch>
	);
};

export default DirectoryItem;
