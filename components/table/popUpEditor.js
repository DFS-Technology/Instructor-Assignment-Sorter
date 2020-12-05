import {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useAuth } from "../../lib/useAuth.js";
import {mutate} from 'swr';

import { SketchPicker } from 'react-color'
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';

import firebase from 'firebase/app'
import 'firebase/database';
import 'firebase/storage';
import {deleteDocuments, addDocuments, editDocuments} from '../../lib/firestoreApi';
import { AirlineSeatFlatOutlined, SentimentSatisfiedAlt } from '@material-ui/icons';
import { setPageActionCreator } from '@material-ui/data-grid';

export function AddInstructor({
    open, 
    setOpen,
    rows,
    programData,
}){
    const classes = useStyles();

    const {currentSeason} = useAuth(); 
    const [state, setState] = useState({
        ['name']: '',
        ['gender']: '',
        ['year_of_instruction']: '',
        ['major'] : '',
        ['university'] : '',
        ['region'] : '',
        ['address'] : '',
        ['car'] : false,
        ['returning_instructor'] : false,
        ['shirt_size'] : '',
        ['programs_teaching']: [],
        ['programs']: {},
        ['languages_spoken']: [],
        ['schedule']: {},
        ['city']: '',
        ['phone_number']: '',
    });
    const handleChange = (event)=>{
        if(event.target.name === 'name'){
            setState({...state, ['name']: event.target.value})
        }else if(event.target.name === 'gender'){
            setState({...state, ['gender']: event.target.value})
        }else if(event.target.name === 'year_of_instruction'){
            setState({...state, ['year_of_instruction']: event.target.value})
        }else if(event.target.name === 'major'){
            setState({...state, ['major']: event.target.value})
        }else if(event.target.name === 'university'){
            setState({...state, ['university']: event.target.value})
        }else if(event.target.name === 'region'){
            setState({...state, ['region']: event.target.value})
        }else if(event.target.name === 'address'){
            setState({...state, ['address']: event.target.value})
        }else if(event.target.name === 'car'){
            setState({...state, ['car']: event.target.checked})
        }else if(event.target.name === 'returning_instructor'){
            setState({...state, ['returning_instructor']: event.target.checked})
        }else if(event.target.name === 'shirt_size'){
            setState({...state, ['shirt_size']: event.target.value})
        }else if(event.target.name === 'programs_teaching'){
            const { options } = event.target;
            const value = [];
            for (let i = 0, l = options.length; i < l; i += 1) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            setState({...state, ['programs_teaching']: value})
        }else if(event.target.name === 'languages_spoken'){
            const { options } = event.target;
            const value = [];
            for (let i = 0, l = options.length; i < l; i += 1) {
                if (options[i].selected) {
                    value.push(options[i].value);
                }
            }
            setState({...state, ['languages_spoken']: value})
        }else if(event.target.name === 'city'){
            setState({...state, ['city']: event.target.value})
        }else if(event.target.name === 'phone_number'){
            setState({...state, ['phone_number']: event.target.value})
        }
        for(day of ['Monday','Tuesday','Wednesday','Thursday','Friday']){
            if(event.target.name === day){
                setState({...state, ['schedule']: {...state['schedule'], [day]: event.target.value}})
            }
        }
        for(program in programData){
            if(event.target.name === program){
                setState({...state, ['programs']: {...state['programs'], [program]: event.target.value}})
            }
        }
    };


    const [error, setError] = useState(false);

    const handleAdd = () =>{
        state['region'] = [state['region']];
        const schedule = {};
        for(day in state['schedule']){
            schedule[day] = [{['start']: state['schedule'][day].split("-")[0],['end']: state['schedule'][day].split("-")[1] }]
        }
        state['schedule'] = schedule;
        const added = [state];
        const newIds = addDocuments(currentSeason, table_type, added);
        const changedRows = [
            ...rows,
            ...added.map((row, index) => ({
              id: newIds[index],
              ...row,
            })),
          ];
        mutate([table_type,auth.currentSeason],changedRows,false);
        setOpen(false);
    };

    
    return (
        <Dialog style={{height:'100%'}} open={open} onClose={()=>setOpen(false)} aria-label="add-program-dialog">
            <DialogTitle id="add-program-dialog-title">
                Add New Instructor
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Add new instructor to current season. 
                </DialogContentText>
        
                <form className={classes.form} noValidate>
                    <TextField
                        label="Name"
                        name="name"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.name}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 1', gridRow:'1 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <FormControl style={{gridColumn:'2 / span 1', gridRow:'1 / span 1', placeSelf:'center stretch', padding:'0.5vh', margin:'0.5vh'}}>
                          <InputLabel children='Gender'/>
                          <Select value={state.gender} onChange={handleChange} name="gender">
                              <MenuItem  value='Male'>Male</MenuItem >
                              <MenuItem  value='Female'>Female</MenuItem >
                              <MenuItem  value='Other'>Other</MenuItem >
                          </Select>
                    </FormControl>
                    <TextField
                        label="Year of Instruction"
                        name="year_of_instruction"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.year_of_instruction}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 1', gridRow:'3 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="Major"
                        name="major"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.major}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 1', gridRow:'2 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="University"
                        name="university"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.university}
                        onChange={handleChange}
                        style={{gridColumn:'2 / span 1', gridRow:'2 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="Region"
                        name="region"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.region}
                        onChange={handleChange}
                        style={{gridColumn:'2 / span 1', gridRow:'3 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="Address"
                        name="address"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.address}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 2', gridRow:'4 / span 1', placeSelf:'center stretch', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    
                    <FormControlLabel
                        control={<Checkbox checked={state.car} onChange={handleChange} name="car" />}
                        label="Car"
                        style={{gridColumn:'3 / span 1', gridRow:'1 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={state.returning_instructor} onChange={handleChange} name="returning_instructor" />}
                        label="Returning"
                        style={{gridColumn:'4 / span 1', gridRow:'1 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    
                    <FormControl>
                          <InputLabel children='Shirt Size'/>
                          <Select name="shirt_size" value={state.shirt_size} onChange={handleChange}>
                              <MenuItem  value='XL'>XL</MenuItem >
                              <MenuItem  value='L'>L</MenuItem >
                              <MenuItem  value='M'>M</MenuItem >
                              <MenuItem  value='S'>S</MenuItem >
                              <MenuItem  value='XS'>XS</MenuItem >
                          </Select>
                    </FormControl>
                    <FormControl>
                          <InputLabel children='Programs'/>
                          <Select name="programs_teaching" value={state.programs_teaching} onChange={handleChange} multiple>
                              {Object.keys(programData).map(program => (<MenuItem  value={program} key={"programs_teaching_"+program}>{program}</MenuItem >))}
                          </Select>
                    </FormControl>
                    <div style={{display:'flex'}}>
                    <FormControl component="fieldset" >
                        <FormLabel component="legend">Program Prefrence</FormLabel>
                        <FormGroup>
                        {state.programs_teaching.map((program)=>(
                            <FormControlLabel
                                control={
                                <Select name={program} value={state.programs[program]}>
                                    {[0,1,2,3,4,5,6,7,8,9,10].map(prefInt=><MenuItem  value={prefInt} key={"programs"+program}>{prefInt}</MenuItem >)}
                                </Select>}
                                label={program}
                            />
                        ))}
                        </FormGroup>
                    </FormControl>
                    </div>
                    <FormControl>
                          <InputLabel
                              children='Languages' id="ManualAssignemnetProgram"/>
                          <Select name='languages_spoken' value={state.languages_spoken} onChange={handleChange} multiple>
                              {['Chinese','English','Korean','Hindi','Spanish','German'].map(lang => 
                                (<MenuItem  value={lang} key={"langItem"+lang}>{lang}</MenuItem >))}
                          </Select>
                    </FormControl>
                    {/* <FormGroup row>
                    <FormControlLabel
                        control={<Checkbox checked={state.schedule[monday]?true:false} onChange={handleChange} name="Monday"/>}
                        label="Monday"
                    />
                    </FormGroup> */}
                    <TextField
                        label="Monday"
                        name="Monday"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.schedule['Monday']}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Tuesday"
                        name="Tuesday"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.schedule['Tuesday']}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Wednesday"
                        name="Wednesday"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.schedule['Wednesday']}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Thursday"
                        name="Thursday"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.schedule['Thursday']}
                        onChange={handleChange}
                    />
                    <TextField
                        label="Friday"
                        name="Friday"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.schedule['Friday']}
                        onChange={handleChange}
                    />
                    <TextField
                        label="City"
                        name="city"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.city}
                        onChange={handleChange}
                        style={{gridColumn:'1 / span 1', gridRow:'5 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                    <TextField
                        label="Phone Number"
                        name="phone_number"
                        className={classes.formControl}  margin="normal" fullWidth 
                        value={state.phone_number}
                        onChange={handleChange}
                        style={{gridColumn:'2 / span 1', gridRow:'5 / span 1', placeSelf:'center', padding:'0.5vh',margin:'0.5vh'}}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button
                    children={'Cancel'} 
                    onClick={()=>setOpen(false)} color="primary"
                />
                <Button
                    children={'Create'}
                    disabled={state.name?true:false || state.address?true:false} 
                    onClick={()=>handleAdd()} variant="contained" color="primary"
                />
            </DialogActions>
        </Dialog>
    );
}

const useStyles = makeStyles((theme) => ({
    form: {
      display: 'grid',
      gridTemplateColumns:"25% 25% 25% 25%",
      gridTemplateRows:"20% 20% 20% 20% 20%",
    },
    formControl: {
      minWidth: 120,
      maxWidth: 400,
    },
    formControlLabel: {
    },
  }));
