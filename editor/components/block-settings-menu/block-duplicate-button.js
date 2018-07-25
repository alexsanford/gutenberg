/**
 * External dependencies
 */
import { every } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { IconButton } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { hasBlockSupport } from '@wordpress/blocks';

export function BlockDuplicateButton( { blocks, onDuplicate, isLocked, small = false, role, ...props } ) {
	const canDuplicate = every( blocks, ( block ) => {
		return hasBlockSupport( block.name, 'multiple', true );
	} );

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

export default compose(
	withSelect( ( select, { clientIds, rootClientId } ) => {
		const {
			getBlocksByClientId,
			getTemplateLock,
		} = select( 'core/editor' );

		return {
			blocks: getBlocksByClientId( clientIds ),
			isLocked: !! getTemplateLock( rootClientId ),
		};
	} ),
)( BlockDuplicateButton );
