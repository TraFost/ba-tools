import { createClient } from "@/app/lib/supabase/server";

export const getStudents = async () => {
  const supabase = await createClient();

  const { data: students } = await supabase
    .from("students")
    .select("id, name, image, track(*)")
    .order("id", { ascending: true });

  const normalizedStudents = students.map((student) => ({
    ...student,
    track: Array.isArray(student.track) ? student.track[0] : student.track,
  }));

  return normalizedStudents;
};

export const getSomeStudents = async (limit: number) => {
  const supabase = await createClient();

  const { data: students } = await supabase
    .from("students")
    .select("id, name, image, track(*)")
    .order("id", { ascending: true })
    .limit(limit);

  const normalizedStudents = students.map((student) => ({
    ...student,
    track: Array.isArray(student.track) ? student.track[0] : student.track,
  }));

  return normalizedStudents;
};
