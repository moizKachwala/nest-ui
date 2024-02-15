import {
    TableCell
} from '@mui/material';
import { get } from 'lodash';

export default function RowColumn(props) {

    const { rowData, field } = props;
    const columnData = field.renderString(get(rowData, field.id));

    return (
        <TableCell>
            <span>{columnData}</span>
        </TableCell>
    )
}