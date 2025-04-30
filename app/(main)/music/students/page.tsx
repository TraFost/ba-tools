import StudentList from "components/music/student/student-list";
import { getStudents } from "@/app/lib/fetcher/get-student";
import type { IStudent } from "@/app/type/student-type";

const StudentsPage = async () => {
  const students: IStudent[] = await getStudents();

  return (
    <div className="w-full">
      <h2 className="text-4xl font-bold mb-4">Memorial Lobby Theme</h2>
      <div>
        <StudentList students={students} />
      </div>
    </div>
  );
};

export default StudentsPage;
