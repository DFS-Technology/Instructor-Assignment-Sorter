// import {useState} from 'react';
// import { makeStyles } from '@material-ui/core/styles';

// import Button from '@material-ui/core/Button';

// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';

// import FormControl from '@material-ui/core/FormControl';
// import InputLabel from '@material-ui/core/InputLabel';
// import TextField from '@material-ui/core/TextField';


// import { useAuth } from "../../lib/useAuth.js";
// import {mutate} from 'swr';

// import { SketchPicker } from 'react-color'
// import Input from '@material-ui/core/Input';
// import FormHelperText from '@material-ui/core/FormHelperText';

// import firebase from 'firebase/app'
// import 'firebase/database';
// import 'firebase/storage';
// import { AirlineSeatFlatOutlined, SentimentSatisfiedAlt } from '@material-ui/icons';

// export function AddEntry({
//     open, 
//     setOpen, 
//     table_type,
// }){
//     const classes = useStyles();

//     const {currentSeason} = useAuth(); 
//     const [programName, setProgramName] = useState('');
//     const [programColor, setProgramColor] = useState('#ffffff');
//     const [programLogo, setProgramLogo] = useState('');

//     const [error, setError] = useState(false);

//     const handleAdd = () =>{
//         return null;
//     };

//     const handleTextChange = (value)=>{
//         setProgramName(value);
//         if(value in programData){
//             setError('Program name already exists.');
//         }else{
//             setError(false);
//         }
//     };
//     return (
//         <Dialog style={{height:'100%'}} open={open} onClose={()=>setOpen(false)} aria-label="add-program-dialog">
//             <DialogTitle id="add-program-dialog-title">
//                 Add New Program
//             </DialogTitle>
//             <DialogContent>
//                 <DialogContentText>
//                     Add new program to current season. Please enter the name of the program, the associated theme color and the app logo in png format.
//                 </DialogContentText>
        
//                 <form className={classes.form} noValidate>
//                     <TextField
//                         label="New Program" id="New-Program-Name"
//                         className={classes.formControl} variant="outlined" margin="normal" fullWidth autoFocus
//                         value={programName}
//                         onChange={(event)=>handleTextChange(event.target.value)}
//                         error={error!=''}
//                         helperText={error}
//                     />
                    
                   
//                     <FormControl className={classes.formControl}>
//                         <InputLabel
//                             children={'Select Logo'} id="logo upload program"/>
//                         <Input error={imgError!=''} id="file input" type='file' accept="image/png" onChange={(event)=>handleFileUpload(event.target.files[0])}/>
//                         <FormHelperText id="my-helper-text">{imgError}</FormHelperText>
//                     </FormControl>
//                 </form>
//             </DialogContent>
//             <DialogActions>
//                 <Button
//                     children={'Cancel'} 
//                     onClick={()=>setOpen(false)} color="primary"
//                 />
//                 <Button
//                     children={'Create'}
//                     disabled={(error!='') || (programName==='') || (imgError!='') || (programLogo==='')} 
//                     onClick={()=>handleAdd()} variant="contained" color="primary"
//                 />
//             </DialogActions>
//         </Dialog>
//     );
// }

// const useStyles = makeStyles((theme) => ({
//     form: {
//       display: 'flex',
//       flexDirection: 'column',
//       margin: 'auto',
//       width: 'fit-content',
//     },
//     formControl: {
//       marginTop: theme.spacing(2),
//       minWidth: 120,
//       maxWidth: 225,
//     },
//     formControlLabel: {
//       marginTop: theme.spacing(1),
//     },
//   }));
