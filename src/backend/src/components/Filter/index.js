import React from 'react';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Button } from '@mui/material';

function Filter(props) {
    const { allTypes, selectedTypes, handleTypeChange, handleResetSelection, handleSubmitSelection } = props;

    return (
        <FormControl component="fieldset">
            <FormLabel component="legend">Genrels</FormLabel>
            <FormGroup>
                {allTypes.map((cuisine) => (
                    <FormControlLabel
                        key={cuisine}
                        control={
                            <Checkbox
                                checked={selectedTypes[cuisine]}
                                onChange={() => handleTypeChange(cuisine)}
                            />
                        }
                        label={cuisine}
                    />
                ))}
            </FormGroup>
            <Button variant="outlined" onClick={handleResetSelection}>Reset</Button>
            <Button variant="outlined" onClick={handleSubmitSelection}>Submit</Button>
        </FormControl>
    );
}

export default Filter;
