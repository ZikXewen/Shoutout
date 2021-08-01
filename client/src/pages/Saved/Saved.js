import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSaved } from "../../actions/auth";
import Navbar from "../../components/Navbar/Navbar";

export default () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  useEffect(() => dispatch(fetchSaved()), []);
  return (
    <>
      <Navbar />
      {user.savedPosts.map()}
    </>
  );
};
