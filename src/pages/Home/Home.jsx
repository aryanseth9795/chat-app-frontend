

import AppLayout from "../../components/Layouts/Applayouts";
import { Typography,Stack, Box} from "@mui/material";
import { grayColor } from "../../constants/color";

const Home = () => {
  return (
<Box bgcolor={grayColor} height={"100%"}>

<Typography variant="h5" textAlign={"center"} p={"2rem"}> Select A Friend to Chat</Typography>

</Box>  );
};

export default AppLayout()(Home);
