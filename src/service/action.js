import {CHECK_LOGIN , FETCH_USERS_BEGIN ,FETCH_USERS_SUCCESS , FETCH_USERS_FAILURE, SEARCH_ITEM , SET_TYPE , SET_ITEM , REMOVE_ITEM , FETCH_PRODUCTS_BEGIN , FETCH_PRODUCTS_SUCCESS , FETCH_PRODUCTS_FAILURE} from "./type";


const setItemAction = (obj) => {
    return{
        type : SET_ITEM,
        payload : obj
    }
}

const setRemoveItemAction = (id)  => {
    return{
        type : REMOVE_ITEM,
        payload : id
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
  
  })

  const setSearchAction = (text) => {
    return{
        
        type : SEARCH_ITEM,
        payload : text
    }
}


const fetchUsersSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload:  users 
  }
}


const fetchUsersFailure = error => ({
type: FETCH_USERS_FAILURE,
payload:  error 
});

const fetchUsersBegin = () => ({
type: FETCH_USERS_BEGIN
});

const checkLoginAction = (obj) => ({
  type: CHECK_LOGIN,
  payload:  obj 
})

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const setSearchItem = text => {
  
  return setSearchAction (text);
};



export const setItem = (text , type ) => {
  let now = Date.now();
  return dispatch => {
      let data = {
          "text": text,
          "type": type,
          "date" : now
      };
      fetch(`http://10.0.2.2:3000/tasks`,
          {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data)
          }
      )
          .then(response => response.json())
          .then(getData => {
              dispatch(setItemAction(getData))
          })
          .catch(error => error)
  }
};


// export const  setItem = () => {
//     return setItemAction({"text": "txt", "type": "Work"});
// } ;



// delete item
export const setRemoveItem = (id ) => {
  return dispatch => {
      const url = "http://10.0.2.2:3000/tasks/";
         fetch(`${url}${id}` ,{
             method: 'DELETE'
         }
      )
          .then(response => response.json())
          .then(data => {
              dispatch(setRemoveItemAction(id));
          })
  }
};

export const setType = type =>{
  return setTypeAction (type)
}


// get items
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

  export const fetchUsers = () => {
    return dispatch => {
      dispatch(fetchUsersBegin());
      fetch("http://10.0.2.2:4000/users")
        .then(data =>  data.json())
        .then(data => {
          dispatch(fetchUsersSuccess(data));
        })
        .catch(error => dispatch(fetchUsersFailure(error)));
    };
  }


export const checkLogin = (obj) =>{
  return checkLoginAction (obj);
}