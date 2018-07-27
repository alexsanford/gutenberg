/**
 * External dependencies
 */
import { noop } from 'lodash';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import { MenuItem } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { isSharedBlock } from '@wordpress/blocks';
import { withSelect, withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';

export function SharedBlockConvertButton( {
	isVisible,
	isStaticBlock,
	onConvertToStatic,
	onConvertToShared,
} ) {
	if ( ! isVisible ) {
		return null;
	}

	return (
		<Fragment>
			{ isStaticBlock && (
				<MenuItem
					className="editor-block-settings-menu__control"
					icon="controls-repeat"
					onClick={ onConvertToShared }
				>
					{ __( 'Convert to Shared Block' ) }
				</MenuItem>
			) }
			{ ! isStaticBlock && (
				<MenuItem
					className="editor-block-settings-menu__control"
					icon="controls-repeat"
					onClick={ onConvertToStatic }
				>
					{ __( 'Convert to Regular Block' ) }
				</MenuItem>
			) }
		</Fragment>
	);
}

export default compose( [
	withSelect( ( select, { clientId } ) => {
		const { getBlock, getSharedBlock } = select( 'core/editor' );
		const { getFallbackBlockName } = select( 'core/blocks' );

		const block = getBlock( clientId );
		if ( ! block ) {
			return { isVisible: false };
		}

		return {
			// Hide 'Convert to Shared Block' on Classic blocks. Showing it causes a
			// confusing UX, because of its similarity to the 'Convert to Blocks' button.
			isVisible: block.name !== getFallbackBlockName(),
			isStaticBlock: ! isSharedBlock( block ) || ! getSharedBlock( block.attributes.ref ),
		};
	} ),
	withDispatch( ( dispatch, { clientId, onToggle = noop } ) => {
		const {
			convertBlockToShared,
			convertBlockToStatic,
		} = dispatch( 'core/editor' );

		return {
			onConvertToStatic() {
				convertBlockToStatic( clientId );
				onToggle();
			},
			onConvertToShared() {
				convertBlockToShared( clientId );
				onToggle();
			},
		};
	} ),
] )( SharedBlockConvertButton );
