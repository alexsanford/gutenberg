/**
 * External dependencies
 */
import classnames from 'classnames';
import { castArray } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { IconButton, Dropdown, NavigableMenu, MenuItem } from '@wordpress/components';
import { withDispatch } from '@wordpress/data';
import { compose } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import './style.scss';
import withBlockSettingsActions from './with-block-settings-actions';
import BlockSettingsKeyboardShortcuts from './keyboard-shortcuts';
import BlockModeToggle from './block-mode-toggle';
import SharedBlockConvertButton from './shared-block-convert-button';
import SharedBlockDeleteButton from './shared-block-delete-button';
import BlockHTMLConvertButton from './block-html-convert-button';
import BlockUnknownConvertButton from './block-unknown-convert-button';
import _BlockSettingsMenuFirstItem from './block-settings-menu-first-item';
import withDeprecatedUniqueId from '../with-deprecated-unique-id';

export class BlockSettingsMenu extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			isFocused: false,
		};
		this.onFocus = this.onFocus.bind( this );
		this.onBlur = this.onBlur.bind( this );
	}

	onFocus() {
		this.setState( {
			isFocused: true,
		} );
	}

	onBlur() {
		this.setState( {
			isFocused: false,
		} );
	}

	render() {
		const {
			clientIds,
			onSelect,
			focus,
			isHidden,
			onDuplicate,
			onRemove,
			canDuplicate,
			isLocked,
			shortcuts,
		} = this.props;
		const { isFocused } = this.state;
		const blockClientIds = castArray( clientIds );
		const count = blockClientIds.length;
		const firstBlockClientId = blockClientIds[ 0 ];

		return (
			<div className="editor-block-settings-menu">
				<BlockSettingsKeyboardShortcuts
					onDuplicate={ onDuplicate }
					onRemove={ onRemove }
					shortcuts={ shortcuts }
				/>
				<Dropdown
					contentClassName="editor-block-settings-menu__popover"
					position="bottom left"
					renderToggle={ ( { onToggle, isOpen } ) => {
						const toggleClassname = classnames( 'editor-block-settings-menu__toggle', {
							'is-opened': isOpen,
							'is-visible': isFocused || isOpen || ! isHidden,
						} );
						const label = isOpen ? __( 'Hide Options' ) : __( 'More Options' );

						return (
							<IconButton
								className={ toggleClassname }
								onClick={ () => {
									if ( count === 1 ) {
										onSelect( firstBlockClientId );
									}
									onToggle();
								} }
								icon="ellipsis"
								label={ label }
								aria-expanded={ isOpen }
								focus={ focus }
								onFocus={ this.onFocus }
								onBlur={ this.onBlur }
							/>
						);
					} }
					renderContent={ ( { onClose } ) => (
						// Should this just use a DropdownMenu instead of a DropDown ?
						<NavigableMenu className="editor-block-settings-menu__content">
							<_BlockSettingsMenuFirstItem.Slot fillProps={ { onClose } } />
							{ count === 1 && (
								<BlockModeToggle
									clientId={ firstBlockClientId }
									onToggle={ onClose }
								/>
							) }
							{ count === 1 && (
								<BlockUnknownConvertButton
									clientId={ firstBlockClientId }
								/>
							) }
							{ count === 1 && (
								<BlockHTMLConvertButton
									clientId={ firstBlockClientId }
								/>
							) }
							{ ! isLocked && canDuplicate && (
								<MenuItem
									className="editor-block-settings-menu__control"
									onClick={ onDuplicate }
									icon="admin-page"
									shortcut={ shortcuts.duplicate.display }
								>
									{ __( 'Duplicate' ) }
								</MenuItem>
							) }
							{ count === 1 && (
								<SharedBlockConvertButton
									clientId={ firstBlockClientId }
									onToggle={ onClose }
								/>
							) }
							<div className="editor-block-settings-menu__separator" />
							{ count === 1 && (
								<SharedBlockDeleteButton
									clientId={ firstBlockClientId }
									onToggle={ onClose }
								/>
							) }
							{ ! isLocked && (
								<MenuItem
									className="editor-block-settings-menu__control"
									onClick={ onRemove }
									icon="trash"
									shortcut={ shortcuts.remove.display }
								>
									{ __( 'Remove Block' ) }
								</MenuItem>
							) }
						</NavigableMenu>
					) }
				/>
			</div>
		);
	}
}

export default compose( [
	withDeprecatedUniqueId,
	withBlockSettingsActions,
	withDispatch( ( dispatch ) => ( {
		onSelect( clientId ) {
			dispatch( 'core/editor' ).selectBlock( clientId );
		},
	} ) ),
] )( BlockSettingsMenu );
