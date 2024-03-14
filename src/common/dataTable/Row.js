import { TableRow } from '@mui/material';
import RowColumn from './RowColumn';

export default function Row(props) {
    const { rowData, fields, onRowClick } = props;

    const handleClick = () => {
        if (onRowClick) {
            onRowClick(rowData);
        }
    };
    return (
        <>
            <TableRow
                hover
                key={rowData.id}
                onClick={handleClick}
                sx={{
                    cursor: onRowClick ? 'pointer' : 'auto',
                }}
            >
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