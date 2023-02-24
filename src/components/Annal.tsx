
import type { EventfulYear } from "../types";
import {  Box, Button, Typography } from "@mui/material";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'



function Annal ({year, events}: EventfulYear) {
    let annal_records: string = events.join(' ');

    const toggleAnnals = (event: React.SyntheticEvent): void => {
        event.currentTarget.classList.toggle('toggle-annal')
        event.currentTarget.parentElement?.parentElement?.classList.toggle('toggle-annal')
        event.currentTarget.nextElementSibling?.nextElementSibling?.classList.toggle('tuxedo-mask');
    }
   
    return (
        <Box
            sx={{ 
                display: 'flex',
                justifyContent: 'flex-start',
                height: '1.5rem',
                width: '85%',
                overflow: 'hidden',
                marginLeft: '0.5rem'
            }}
            className="annal-box"
        >
            <Button variant="text" 
                        disableElevation
                        sx={{alignSelf: 'center', paddingLeft: '0.25rem', minWidth: '0',  height: '1.2rem' }}
                        onClick={toggleAnnals}
                        >
                            <ArrowForwardIosIcon sx={{ fontSize: '0.8rem', transform: 'none' }}  />
                        </Button>
            <Typography sx={{ alignSelf: 'center', fontWeight: 'bolder' }}>
                { year }
            </Typography>
            <Typography sx={{
                paddingLeft: '1.5rem',
                width: '100%'
            }}
                className="tuxedo-mask">
                { annal_records }
            </Typography>
        </Box>
    )

}

export default Annal;