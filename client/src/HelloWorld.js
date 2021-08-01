import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchHello } from "./api";

export default () => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const hello = () => async (dispatch) => {
    const { data } = await fetchHello();
    return data;
  };
  useEffect(() => {
    dispatch(hello()).then(setMessage);
  }, []);
  return <div>{message}</div>;
};
