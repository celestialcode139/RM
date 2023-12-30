import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import SearchIcon from "../assets/icons/search.png";

export default function InputAdornments() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <FormControl sx={{ width: '100%', borderRadius: '5px', backgroundColor: "white" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={'text'}
                endAdornment={
                    <Box component="img" src={SearchIcon} sx={{width:"20px"}}></Box>
                }
                label="Password"
            />
        </FormControl>
    );
}