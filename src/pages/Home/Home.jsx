

import AppLayout from "../../components/Layouts/Applayouts";
import { Typography,Stack, Box} from "@mui/material";
import { grayColor } from "../../constants/color";
import { useSelector } from "react-redux";

const Home = () => {
  const {name } =useSelector((state)=>state.Auth.user)
  return (
<Box bgcolor={grayColor} height={"100%"}>

<Typography variant="h5" textAlign={"center"} p={"2rem"}> Welcome Back {name} ! Select A Friend to Chat</Typography>

</Box>  );
};

export default AppLayout()(Home);
