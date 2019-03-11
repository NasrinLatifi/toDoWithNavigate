import { SEARCH_ITEM , SET_TYPE , SET_ITEM , REMOVE_ITEM , FETCH_PRODUCTS_BEGIN , FETCH_PRODUCTS_SUCCESS , FETCH_PRODUCTS_FAILURE} from "./type";


const setItemAction = (text) => {
    return{
        type : SET_ITEM,
        payload : text
    }
}

const setRemoveItemAction = (idex)  => {
    return{
        type : REMOVE_ITEM,
        payload : idex
    }
}
 const setTypeAction = typeState => {
  
   return {
     type : SET_TYPE,
     payload : typeState
   }
 }
 const fetchProductsBegin = () => ({
    type: FETCH_PRODUCTS_BEGIN
  });

  const fetchProductsSuccess = (products) => {
      return {
        type: FETCH_PRODUCTS_SUCCESS,
        payload:  products 
      }
  }
  
 
   const fetchProductsFailure = error => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload:  error 
  });

  const setSearchAction = (text) => {
    return{
        
        type : SEARCH_ITEM,
        payload : text
    }
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const setSearchItem = text => {

  return setSearchAction (text);
};

export const  setItem = text => {
    return setItemAction(text);
} ;

export const  setRemoveItem = index => {
    return setRemoveItemAction(index);
} ;

export const setType = type =>{
  return setTypeAction (type)
}


export const fetchProducts = () => {
    
    return dispatch => {
         
      dispatch(fetchProductsBegin());
      fetch("http://10.0.2.2:3000/tasks")
        .then(data =>  data.json())
        .then(data => {
          dispatch(fetchProductsSuccess(data));
        })
        .catch(error => dispatch(fetchProductsFailure(error)));
    };
  }
