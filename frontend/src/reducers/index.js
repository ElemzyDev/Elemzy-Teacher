import { combineReducers } from "redux";
import errors from "./errors";
import messages from "./messages";
import auth from "./auth";
import style from "./style";
import {classRoomReducer} from "../teachers/reducers/classroom";

export default combineReducers({
  errors,
  messages,
  auth,
  classroom:classRoomReducer,
  style,
});
