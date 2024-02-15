import {
    TableCell
} from '@mui/material';

export default function HeaderColumn(props) {

    const { field} = props;
    const { id, label } = field;

    return (
        <TableCell>
            {label}
        </TableCell>
    )
}