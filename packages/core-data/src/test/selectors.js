/**
 * External dependencies
 */
import deepFreeze from 'deep-freeze';

/**
 * Internal dependencies
 */
import { getEntityRecord, getEntityRecords } from '../selectors';

jest.mock( '@wordpress/data', () => {
	return {
		select: jest.fn().mockReturnValue( {
			isResolving: jest.fn().mockReturnValue( false ),
		} ),
	};
} );

describe( 'getEntityRecord', () => {
	it( 'should return undefined for unknown record’s key', () => {
		const state = deepFreeze( {
			entities: {
				data: {
					root: {
						postType: {
							byKey: {},
						},
					},
				},
			},
		} );
		expect( getEntityRecord( state, 'root', 'postType', 'post' ) ).toBe( undefined );
	} );

	it( 'should return a record by key', () => {
		const state = deepFreeze( {
			entities: {
				data: {
					root: {
						postType: {
							byKey: {
								post: { slug: 'post' },
							},
						},
					},
				},
			},
		} );
		expect( getEntityRecord( state, 'root', 'postType', 'post' ) ).toEqual( { slug: 'post' } );
	} );
} );

describe( 'getEntityRecords', () => {
	it( 'should return an empty array by default', () => {
		const state = deepFreeze( {
			entities: {
				data: {
					root: {
						postType: {
							byKey: {},
						},
					},
				},
			},
		} );
		expect( getEntityRecords( state, 'root', 'postType' ) ).toEqual( [] );
	} );

	it( 'should return all the records', () => {
		const state = deepFreeze( {
			entities: {
				data: {
					root: {
						postType: {
							byKey: {
								post: { slug: 'post' },
								page: { slug: 'page' },
							},
						},
					},
				},
			},
		} );
		expect( getEntityRecords( state, 'root', 'postType' ) ).toEqual( [
			{ slug: 'post' },
			{ slug: 'page' },
		] );
	} );
} );

