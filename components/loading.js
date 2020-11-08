import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function Loading(){
    return(
        <Backdrop style={{backgroundColor: '#fff'}} open={true}>
          <CircularProgress color="secondary" />
        </Backdrop>
    );
}