import {SET_TYPE , SET_ITEM , REMOVE_ITEM, FETCH_PRODUCTS_BEGIN , FETCH_PRODUCTS_SUCCESS , FETCH_PRODUCTS_FAILURE} from './type'


const initialState = {
    type : '',
    loading: false,
    error: null ,
    item : [
    ]
    
}

function reducer(state = initialState, action) {
    
    switch (action.type) {
        case SET_ITEM:
            return {
                ...state,
                item : [...state.item , { 'text': action.payload,  'id' : state.id }]
            };
        
        case SET_TYPE:
            let filteredData = 
            state.item.filter(item => 
                item.type.toUpperCase().includes(action.payload.toUpperCase())
            );
            return {
                ...state,
                item : [...filteredData]
            };
        case REMOVE_ITEM:
            return {
                ...state,
                item : [
                    ...state.item.slice(0,action.payload),
                    ...state.item.slice(action.payload + 1 )
                ]
            };
        case FETCH_PRODUCTS_BEGIN:
                return {
                    ...state,
                    loading: true,
                    error: null
                };

        case FETCH_PRODUCTS_SUCCESS:
        return {
            
            ...state,
            loading: false,
            item: action.payload
        };

        case FETCH_PRODUCTS_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload,
            item: []
        };
        default:
            return state;
    }

}
export default reducer
