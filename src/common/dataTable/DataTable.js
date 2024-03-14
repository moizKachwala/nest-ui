import {
    TableContainer, Table, TableHead, TableBody, Paper, TableRow
} from '@mui/material';
import Header from './Header';
import Row from './Row';

export default function Datatable(props) {
    const { data, fields, onRowClick } = props;

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <Header
                            key="header"
                            fields={fields} />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((rowData, index) => {
                        return (
                            <Row 
                                index={`${index.toString()}`}
                                key={`column-${index}`}
                                rowData={rowData}
                                fields={fields}
                                onRowClick={onRowClick}
                            />
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}