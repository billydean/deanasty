
import type { EventfulYear } from "../types";
import { Accordion, AccordionDetails, Typography } from "@mui/material";
import MuiAccordianSummary, {AccordionSummaryProps} from '@mui/material/AccordionSummary'
import { styled } from '@mui/material/styles'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordianSummary
        expandIcon={<ArrowForwardIosIcon sx={{ fontSize: '0.8rem'}} />}
        {...props}
    />
))(({ theme }) => ({
    // add dark theme later?
    flexDirection: 'row-reverse',
    margin: '0',
    padding: '0',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
}));


function Annal ({year, events}: EventfulYear) {
    let annal_records: string = events.join(' ');
    // const expandArrow = 'rotate(90deg)';
    // const closedArrow = 'none';
    // const expandContent = 'fit-content';
    // const closedContent = '1.5rem';
    // let closedStatus = true;
    // let contentStatus = closedContent;
    // let arrowStatus = closedArrow;

    // const openState = {
    //     arrow: 'rotate(90deg)',
    //     content: 'fit-content'
    // }
    // const closedState
    // const [open, setOpen] = useState()

    // function click () {
    //     if (closedStatus) {
    //         contentStatus = expandContent;
    //         arrowStatus = expandArrow;
    //         closedStatus = false;
    //     } else {
    //         contentStatus = closedArrow;
    //         arrowStatus = closedArrow;
    //         closedStatus = true;
    //     }
    // }
    return (
    //     <Box
    //         sx={{ 
    //             display: 'flex',
    //             justifyContent: 'flex-start',
    //             height: contentStatus,
    //             width: '80%',
    //             overflow: 'hidden',
    //             marginLeft: '0.5rem'
    //         }}
    //     >
    //         <Button variant="text" 
    //                     disableElevation
    //                     sx={{alignSelf: 'center', paddingLeft: '0.25rem', width: '1.2rem', height: '1.2rem' }}
    //                     onClick={()=>click()}
    //                     >
    //                         <ArrowForwardIosIcon sx={{ fontSize: '0.8rem', transform: arrowStatus }}  />
    //                     </Button>
    //         <Typography sx={{ alignSelf: 'center', fontWeight: 'bolder' }}>
    //             { year }
    //         </Typography>
    //         <Typography sx={{ paddingLeft: '1.5rem' }}>
    //             { annal_records }
    //         </Typography>
    //     </Box>
        <div>
        <Accordion 
        elevation={0}
        square
        disableGutters
        sx={{ display: 'flex', padding: '0' }}>
            <AccordionSummary>
                <Typography>
                    { year }
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    { annal_records }
                </Typography>
            </AccordionDetails>
        </Accordion>
        </div>
    )

}

export default Annal;