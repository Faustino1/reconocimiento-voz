import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import uuid from 'react-uuid';
import { Neondiv } from './StyledComponent';

const Item = styled(Paper)(({ theme }) => ({
    //...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

const DisplayNotas = ({ data }) => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
                {
                    data.map((savedNotas => (
                        <Grid item xs={12} sm={4} key={savedNotas.group}>
                            <Item>
                                {savedNotas.name.map((string) => (
                                    <Neondiv as="div" key={uuid()} status={savedNotas.group}>{string}</Neondiv>
                                ))}
                            </Item>
                        </Grid>
                    )))
                }
            </Grid>
        </Box>
    )
}
export default DisplayNotas;