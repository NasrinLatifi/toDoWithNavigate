import {SEARCH_ITEM , SET_TYPE , SET_ITEM , REMOVE_ITEM, FETCH_PRODUCTS_BEGIN , FETCH_PRODUCTS_SUCCESS , FETCH_PRODUCTS_FAILURE} from './type'


const initialState = {
    type : '',
    loading: false,
    error: null ,
    items : [],
    selectedItem : [],
    
}

function reducer(state = initialState, action) {
    
    switch (action.type) {
        case SET_ITEM:
            return {
                ...state,
                items : [...state.items , action.payload],
                selectedItem : [...state.selectedItem , action.payload]
            };
        
        case SET_TYPE:
            
            let filteredData =[]
            if(!action.payload.toUpperCase().includes("ALL")){
                filteredData = 
                state.items.filter(item => 
                    item.type.toUpperCase().includes(action.payload.toUpperCase())
                );
            }
            else{
                 filteredData = state.items
            }
            return {
                ...state,
                selectedItem : [...filteredData]
            };
        case REMOVE_ITEM:
            const index = state.items.findIndex(({ id }) => id == action.payload );
            const indexSelected = state.selectedItem.findIndex(({ id }) => id == action.payload );
            return {
                ...state,
                items : [
                    ...state.items.slice(0,index),
                    ...state.items.slice(index + 1 )
                ],
                selectedItem : [
                    ...state.selectedItem.slice(0,indexSelected),
                    ...state.selectedItem.slice(indexSelected + 1 )
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
            items: action.payload,
            selectedItem: action.payload
        };

        case FETCH_PRODUCTS_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload,
            items: [],
            selectedItem : []
        };
        case SEARCH_ITEM:
            let filteredDatas = 
                state.selectedItem.filter(item => 
                    item.text.toUpperCase().includes(action.payload.toUpperCase())
                );
            return {
                ...state,
                selectedItem : [...filteredDatas]
        };

        default:
            return state;
    }

}
export default reducer
