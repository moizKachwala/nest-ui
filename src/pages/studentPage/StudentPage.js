import Container from "@mui/material/Container";
import { useEffect } from "react";
import { DataTable } from "../../common";
import { useNavigate } from 'react-router-dom';

export default function StudentPage(props) {
    const { students, getParentId, fields, studentListPending, actions: {studentGetByParent} } = props;
    const navigate = useNavigate();
    useEffect(() => {
        studentGetByParent(getParentId);
      }, [studentGetByParent, getParentId]);

    const handleRowClick = (rowData) => {
        navigate(`/student/${rowData.id}/activities`);
    }
    
    return (
        <Container maxWidth="lg">
            <h1>My Students</h1>
            <DataTable fields={fields} data={students} onRowClick={handleRowClick}/>
    </Container>
    );
}