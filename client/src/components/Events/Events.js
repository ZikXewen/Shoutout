import { Button, Box } from "@material-ui/core";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "CLEAR" });
  }, [dispatch]);
  return (
    <Box display="flex" flexDirection="column">
      <Button variant="contained">Create an event</Button>
      "hi"
    </Box>
  );
};
