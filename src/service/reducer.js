import { SET_NAME, SET_LASTNAME, SET_ID , SET_ITEM , REMOVE_ITEM, FETCH_PRODUCTS_BEGIN , FETCH_PRODUCTS_SUCCESS , FETCH_PRODUCTS_FAILURE} from './type'


const initialState = {
    // name: '',
    // lastname: '',
    loading: false,
    error: null ,
    id : 0 ,
    item : [
    //    { "text" :'' , 
    //     "id": 0 }
    ]
    
}

function reducer(state = initialState, action) {
    console.warn(action)
    switch (action.type) {
        case SET_NAME:
            return {
                ...state,
                name: action.payload,


            };
        case SET_LASTNAME:
            return {
                ...state,
                lastname: action.payload
            };
        case SET_ID:
            return {
                ...state,
                id: state.id + 1
            };
        case SET_ITEM:
            return {
                ...state,
                
                item : [...state.item , { 'text': action.payload,  'id' : state.id }]
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
