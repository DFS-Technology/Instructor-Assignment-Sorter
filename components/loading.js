import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading(){
    return(
        <Backdrop open={true}>
          <CircularProgress color="secondary" />
        </Backdrop>
    );
}