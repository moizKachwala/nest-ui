import Container from "@mui/material/Container";
import { useEffect } from "react";
import { DataTable } from "../../common";

export default function StudentPage(props) {
    const { students, getParentId, fields, studentListPending, actions: {studentGetByParent} } = props;

    useEffect(() => {
        studentGetByParent(getParentId);
      }, [studentGetByParent, getParentId]);
    
    return (
        <Container maxWidth="lg">
            <h1>My Students</h1>
            <DataTable fields={fields} data={students} />
    </Container>
    );
}