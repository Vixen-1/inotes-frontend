import { Box, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {

    const navigate = useNavigate();
  return (
    <Stack>
    <Box>
        <Typography variant="body1" component="p">Sorry, we are unable to process your signup</Typography>
        <Typography>Go back to home page</Typography>
        <Button variant="outlined" onClick={()=>{navigate('/home')}}>Go Back</Button>
    </Box>
    </Stack>
  )
}
