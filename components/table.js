import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Text, View } from './Themed';

const Col = {name : 'title', first :  1, second :  2, last : 3}

export default function BasicTable() {
    return(
        <View>
             <TableContainer component={Paper}>
                 
                 </TableContainer>
            <Text>Bonjour</Text>
        </View>
    )
}