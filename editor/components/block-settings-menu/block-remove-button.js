/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { IconButton } from '@wordpress/components';

export default function BlockRemoveButton( { onRemove, isLocked, role, ...props } ) {
	if ( isLocked ) {
		return null;
	}

	const label = __( 'Remove Block' );

	return (
		<IconButton
			className="editor-block-settings-menu__control"
			onClick={ onRemove }
			icon="trash"
			label={ label }
			role={ role }
			{ ...props }
		>
			{ label }
		</IconButton>
	);
}
