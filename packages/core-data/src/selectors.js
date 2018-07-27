/**
 * External dependencies
 */
import createSelector from 'rememo';
import { map, find, get, filter } from 'lodash';

/**
 * Returns all available authors.
 *
 * @param {Object} state Data state.
 *
 * @return {Array} Authors list.
 */
export function getAuthors( state ) {
	return getUserQueryResults( state, 'authors' );
}

/**
 * Returns all the users returned by a query ID.
 *
 * @param {Object} state   Data state.
 * @param {string} queryID Query ID.
 *
 * @return {Array} Users list.
 */
export const getUserQueryResults = createSelector(
	( state, queryID ) => {
		const queryResults = state.users.queries[ queryID ];

		return map( queryResults, ( id ) => state.users.byId[ id ] );
	},
	( state, queryID ) => [ state.users.queries[ queryID ], state.users.byId ]
);

/**
 * Returns whether the entities for the give kind are loaded.
 *
 * @param {Object} state   Data state.
 * @param {string} kind  Entity kind.
 *
 * @return {boolean} Whether the entities are loaded
 */
export function getEntitiesByKind( state, kind ) {
	return filter( state.entities.config, { kind } );
}

/**
 * Returns the entity object given its kind and name.
 *
 * @param {Object} state   Data state.
 * @param {string} kind  Entity kind.
 * @param {string} name  Entity name.
 *
 * @return {Object} Entity
 */
export function getEntity( state, kind, name ) {
	return find( state.entities.config, { kind, name } );
}

/**
 * Returns the Entity's record object by key.
 *
 * @param {Object} state  State tree
 * @param {string} kind   Entity kind.
 * @param {string} name   Entity name.
 * @param {number} key    Record's key
 *
 * @return {Object?} Record.
 */
export function getEntityRecord( state, kind, name, key ) {
	return get( state.entities.data, [ kind, name, 'byKey', key ] );
}

/**
 * Returns the Entity's records.
 *
 * @param {Object} state  State tree
 * @param {string} kind   Entity kind.
 * @param {string} name   Entity name.
 *
 * @return {Array} Records.
 */
export const getEntityRecords = createSelector(
	( state, kind, name ) => {
		return Object.values( get( state.entities.data, [ kind, name, 'byKey' ] ) );
	},
	( state, kind, name ) => [ get( state.entities.data, [ kind, name, 'byKey' ] ) ]
);

/**
 * Return theme supports data in the index.
 *
 * @param {Object} state Data state.
 *
 * @return {*}           Index data.
 */
export function getThemeSupports( state ) {
	return state.themeSupports;
}
