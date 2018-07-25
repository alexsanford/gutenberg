/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { IconButton } from '@wordpress/components';

export default function BlockDuplicateButton( { canDuplicate, isLocked, onDuplicate, small = false, role, ...props } ) {
	if ( isLocked || ! canDuplicate ) {
		return null;
	}

	const label = __( 'Duplicate' );

	return (
		<IconButton
			className="editor-block-settings-menu__control"
			onClick={ onDuplicate }
			icon="admin-page"
			label={ small ? label : undefined }
			role={ role }
			{ ...props }
		>
			{ ! small && label }
		</IconButton>
	);
}
