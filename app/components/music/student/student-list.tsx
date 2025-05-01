"use client";

import type { IStudent } from "@/app/type/student-type";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef, useState } from "react";
import StudentItem from "components/music/student/student-item";
import { Input } from "components/ui/input";

interface Props {
  students: IStudent[];
}

const StudentList: React.FC<Props> = (props) => {
  const { students } = props;

  const parentRef = useRef<HTMLDivElement>(null);
  const [columns, setColumns] = useState(1);

  const [search, setSearch] = useState<string>("");
  const [filteredStudent, setFilteredStudent] = useState<IStudent[]>(students);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "") {
      setFilteredStudent(students);
      setSearch("");
      return;
    }

    setSearch(value);

    const filteredMusicList = students.filter(
      (student) =>
        student.name.toLowerCase().includes(value.toLowerCase()) ||
        student.track.title.toLowerCase().includes(value.toLowerCase()),
    );

    setFilteredStudent(filteredMusicList);
  };

  useEffect(() => {
    const updateColumns = () => {
      const width = parentRef.current?.offsetWidth || 0;
      if (width >= 1280)
        setColumns(4); // xl
      else if (width >= 1024)
        setColumns(3); // lg
      else if (width >= 640)
        setColumns(3); // sm
      else if (width >= 552)
        setColumns(2); // md
      else setColumns(1); // default
    };

    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const rows = Math.ceil(filteredStudent.length / columns);

  const virtualizer = useWindowVirtualizer({
    count: rows,
    estimateSize: () => 75,
    overscan: 6,
  });

  return (
    <div ref={parentRef}>
      <Input
        type="search"
        placeholder="Search student..."
        value={search}
        onChange={handleSearch}
        className="w-96 max-w-full mb-4"
      />
      <div
        style={{
          height: virtualizer.getTotalSize(),
          width: "100%",
          position: "relative",
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const items = filteredStudent.slice(
            virtualRow.index * columns,
            virtualRow.index * columns + columns,
          );

          return (
            <div
              key={virtualRow.index}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
              className={`grid grid-cols-${columns} gap-2`}
            >
              {items.map((student) => (
                <StudentItem key={student.id} student={student} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StudentList;
