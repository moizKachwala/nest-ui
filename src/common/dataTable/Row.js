import { TableRow } from '@mui/material';
import RowColumn from './RowColumn';

export default function Row(props) {
    const {rowData, fields} = props;
    return (
        <>
            <TableRow key={rowData.id}>
                {fields.map((field, index) => (
                    <RowColumn 
                        key={`column-${index}`}
                        rowData={rowData}
                        field={field}
                    />
                ))}
            </TableRow>
        </>
    )
}