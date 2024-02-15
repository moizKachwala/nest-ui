import Container from "@mui/material/Container";
import { useEffect } from "react";
import { DataTable } from "../../common";

export default function StudentPage(props) {
    const { students, fields, studentListPending, actions: {studentGetByParent} } = props;

    useEffect(() => {
        studentGetByParent('acdd7fa5-3477-4ae7-b739-1b7f3fdfcf07');
      }, [studentGetByParent]);
    
    return (
        <Container maxWidth="lg">
            <h1>My Students</h1>
            <DataTable fields={fields} data={students} />
    </Container>
    );
}