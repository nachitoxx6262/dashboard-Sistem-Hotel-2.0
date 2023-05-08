import { GET_CLIENTS, GET_COMPANYS,GET_ROOM } from './action';

const initialState = {
  clients: [],
  companys: [],
  companysOption: [],
  clientsOption: [],
  room:[]
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CLIENTS:
      return {
        ...state,
        clients: action.payload,
        clientsOption: action.payload?.map((element) => element.name)
      };
    case GET_COMPANYS:
      return {
        ...state,
        companys: action.payload,
        companysOption: action.payload?.map((element) => element.name),
      };
      case GET_ROOM:
      return {
        ...state,
        room: action.payload
      };
    default:
      return {
        ...state,
      };
  }
};
export default rootReducer;
