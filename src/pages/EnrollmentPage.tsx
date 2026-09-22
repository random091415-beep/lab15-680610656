import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import {
  courses,
  currentStudent,
  enrollments as initialEnrollments,
} from "@/lib/mock-data";
import { useState } from "react";
import type { Enrollment } from "@/lib/types";

export default function EnrollmentPage() {
  const [enrollments, setEnrollments] =
    useState<Enrollment[]>(initialEnrollments);

  const handleRegister = (courseId: string, time: string) => {
    setEnrollments((prev) => [
      ...prev,
      {
        studentId: currentStudent.studentId,
        courseId: courseId,
        enrolledAt: time,
      },
    ]);
  };

  const handleUnregister = (courseId: string) => {
    setEnrollments((prev) => prev.filter((item) => item.courseId !== courseId));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">รายวิชาทั้งหมด</h1>
          <p className="text-muted-foreground mt-1">
            กิตติภพ อินทำ (680610656)
          </p>
        </div>

        <RegisterDialog
          courses={courses}
          enrollments={enrollments}
          student={currentStudent}
          onRegister={handleRegister}
        />
      </div>

      <div className="flex flex-col gap-4">
        {courses.map((course) => {
          const enrollment = enrollments.find(
            (e) => e.courseId === course.courseId,
          );

          return (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              enrolledAt={enrollment?.enrolledAt}
              onUnregister={() => handleUnregister(course.courseId)}
            />
          );
        })}
      </div>
    </div>
  );
}
