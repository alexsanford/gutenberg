/**
 * External dependencies
 */
import { flow } from 'lodash';

/**
 * WordPress dependencies
 */
import { KeyboardShortcuts } from '@wordpress/components';

const preventDefault = ( event ) => {
	event.preventDefault();
	return event;
};

export function BlockSettingsKeyboardShortcuts( { onDuplicate, shortcuts } ) {
	return (
		<KeyboardShortcuts
			bindGlobal
			shortcuts={ {
				[ shortcuts.duplicate.raw ]: flow( preventDefault, onDuplicate ),
			} }
		/>
	);
}

export default BlockSettingsKeyboardShortcuts;
