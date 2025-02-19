import {
    UPDATE_COORDINATES,
    CLEAR_FILTERS,
    SET_SELECTED_ACTIVITY_FILTER,
    CLEAR_ACTIVITY_FILTER,
    SET_MACHINE_FILTER,
    SET_NUM_MACHINES_FILTER,
    SET_VIEW_FAVORITE_LOCATIONS_FILTER,
    SET_LOCATION_TYPE_FILTER,
    SET_OPERATOR_FILTER,
    FETCHING_LOCATION_TRACKING_SUCCESS,
    INITIAL_FETCHING_LOCATION_TRACKING_FAILURE,
    SET_MAX_ZOOM,
    SET_MACHINE_VERSION_FILTER,
    CLEAR_SEARCH_BAR_TEXT,
    SET_SEARCH_BAR_TEXT,
} from '../actions/types'

export const initialState = {
    locationName: '',
    curLat: '',
    curLon: '',
    latDelta: '',
    lonDelta: '',
    machineId: '',
    locationType: '',
    numMachines: 0,
    selectedOperator: '',
    selectedActivity: '',
    machine: {},
    maxZoom: false,
    viewByFavoriteLocations: false,
    filterByMachineVersion: false,
    searchBarText: '',
}

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_COORDINATES:
        case FETCHING_LOCATION_TRACKING_SUCCESS:
        case INITIAL_FETCHING_LOCATION_TRACKING_FAILURE:
            return {
                ...state,
                curLat: Number(action.lat),
                curLon: Number(action.lon),
                latDelta: Number(action.latDelta ? action.latDelta : 0.1),
                lonDelta: Number(action.lonDelta ? action.lonDelta : 0.1),
            }
        case SET_MACHINE_FILTER: {
            if (!action.machine) {
                return {
                    ...state,
                    machineId: '',
                    machine: {},
                }
            } else {
                return {
                    ...state,
                    machineId: action.machine.id,
                    machine: action.machine,
                }
            }
        }
        case SET_NUM_MACHINES_FILTER:
            return {
                ...state,
                numMachines: action.numMachines,
            }
        case SET_VIEW_FAVORITE_LOCATIONS_FILTER:
            return {
                ...state,
                viewByFavoriteLocations: action.viewByFavoriteLocations,
            }
        case SET_LOCATION_TYPE_FILTER:
            return {
                ...state,
                locationType: action.locationType > -1 ? action.locationType : '',
            }
        case SET_OPERATOR_FILTER:
            return {
                ...state,
                selectedOperator: action.selectedOperator > -1 ? action.selectedOperator : '',
            }
        case CLEAR_FILTERS:
            return {
                ...state,
                machineId: '',
                locationType: '',
                numMachines: 0,
                selectedOperator: '',
                machine: {},
                viewByFavoriteLocations: false,
            }
        case SET_SELECTED_ACTIVITY_FILTER:
            return {
                ...state,
                selectedActivity: action.selectedActivity,
            }
        case CLEAR_ACTIVITY_FILTER:
            return {
                ...state,
                selectedActivity: '',
            }
        case SET_MAX_ZOOM:
            return {
                ...state,
                maxZoom: action.maxZoom || false,
            }
        case SET_MACHINE_VERSION_FILTER:
            return {
                ...state,
                filterByMachineVersion: action.filterByMachineVersion,
            }
        case SET_SEARCH_BAR_TEXT:
            return {
                ...state,
                searchBarText: action.searchBarText,
            }
        case CLEAR_SEARCH_BAR_TEXT:
            return {
                ...state,
                searchBarText: ''
            }
        default:
            return state
    }
}
