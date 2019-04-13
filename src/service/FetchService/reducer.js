import {SET_STEP ,EDIT_TASK , FETCH_USERS_BEGIN ,CHANGE_STEP , SEARCH_ITEM , SET_TYPE , SET_ITEM , REMOVE_ITEM, FETCH_PRODUCTS_BEGIN , FETCH_PRODUCTS_SUCCESS , FETCH_PRODUCTS_FAILURE} from './type'


const initialState = {
    type : '',
    loading: false,
    error: null ,
    items : [],
    selectedItem : [],
    stepList : [],
    permission : 0,
    step : '',
    
}

function reducer(state = initialState, action) {
    
    switch (action.type) {
        case SET_ITEM:
            return {
                ...state,
                items : [...state.items , action.payload],
                selectedItem : [...state.selectedItem , action.payload],
                stepList : [...state.stepList , action.payload ]
            };
        
        case SET_TYPE:
            
            let filteredData =[]
            if(!action.payload.toUpperCase().includes("ALL")){
                filteredData = 
                state.items.filter(item => 
                    item.type.includes((action.payload))
                );
            }
            else{
                 filteredData = state.items
            }
            return {
                ...state,
                type : action.payload,
                selectedItem : [...filteredData],
                stepList  : [...filteredData]
            };

        case SET_STEP:
            
            let filteredStepData = state.selectedItem.filter(item => item.step===(action.payload) );
           
            return {
                ...state,
                step : action.payload,
                stepList : [...filteredStepData]
            };

        case REMOVE_ITEM:
            const index = state.items.findIndex(({ id }) => id == action.payload );
            const indexSelected = state.selectedItem.findIndex(({ id }) => id == action.payload );
            const indexSelectedstep = state.stepList.findIndex(({ id }) => id == action.payload );
            return {
                ...state,
                items : [
                    ...state.items.slice(0,index),
                    ...state.items.slice(index + 1 )
                ],
                selectedItem : [
                    ...state.selectedItem.slice(0,indexSelected),
                    ...state.selectedItem.slice(indexSelected + 1 )
                ],
                stepList : [
                    ...state.stepList.slice(0,indexSelectedstep),
                    ...state.stepList.slice(indexSelectedstep + 1 )
                ]
            };

        case CHANGE_STEP: 
        const indexTS = state.items.findIndex(({ id }) => id == action.payload );
        const indexSelectedTS = state.selectedItem.findIndex(({ id }) => id == action.payload );
        const indexSelectedstepT = state.stepList.findIndex(({ id }) => id == action.payload );
        return {
            ...state,

            
            items : [
                ...state.items.slice(0,indexTS),

                {"id": action.item.id , "text" : action.item.text , "date": action.item.date , "type":action.item.type , "step" : action.step},
                
                ...state.items.slice(indexTS + 1 )
            ],
            selectedItem : [
                ...state.selectedItem.slice(0,indexSelectedTS),
                
                {"id": action.item.id , "text" : action.item.text , "date": action.item.date , "type":action.item.type , "step" : action.step},
                
                ...state.selectedItem.slice(indexSelectedTS + 1 )
            ],
            
            stepList : [
                ...state.stepList.slice(0,indexSelectedstepT),
                ...state.stepList.slice(indexSelectedstepT + 1 )
            ]
        };

        case EDIT_TASK : 

        const indexT = state.items.findIndex(({ id }) => id == action.payload );
        const indexSelectedT = state.selectedItem.findIndex(({ id }) => id == action.payload );
        const indexSelectedS = state.stepList.findIndex(({ id }) => id == action.payload );
        return {
            ...state,
            items : [
                ...state.items.slice(0,indexT),

                {"id": action.item.id , "text" : action.text , "date": action.item.date , "type":action.item.type , "step" : action.item.step},
                
                ...state.items.slice(indexT + 1 )
            ],
            selectedItem : [
                ...state.selectedItem.slice(0,indexSelectedT),
                
                {"id": action.item.id , "text" : action.text , "date": action.item.date , "type":action.item.type , "step" : action.item.step},
                
                ...state.selectedItem.slice(indexSelectedT + 1 )
            ],
            stepList : [
                ...state.stepList.slice(0,indexSelectedS),
                
                {"id": action.item.id , "text" : action.text , "date": action.item.date , "type":action.item.type , "step" : action.item.step },
                
                ...state.stepList.slice(indexSelectedS + 1 )
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
            selectedItem: action.payload,
            stepList : action.payload,
        };

        case FETCH_PRODUCTS_FAILURE:
        return {
            ...state,
            loading: false,
            error: action.payload,
            items: [],
            selectedItem : [],
            stepList : []
        };
        case SEARCH_ITEM:
            let filteredDatas =[]
            filteredDatas = 
                state.stepList.filter(item => 
                    item.text.toUpperCase().includes(action.payload.toUpperCase())
                );
            return {
                ...state,
                stepList : [...filteredDatas],
        };


        case FETCH_USERS_BEGIN:
                return {
                    ...state,
                    loading: true,
                    error: null
                };

      

        default:
            return state;
    }

}
export default reducer
