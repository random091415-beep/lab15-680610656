import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { formatBuddhistDateTime } from "@/lib/utils";
type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  onUnregister?: () => void;
};

export function CourseCard({
  course,
  student,
  enrolledAt,
  onUnregister,
}: CourseCardProps) {
  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-base">{course.courseTitle}</CardTitle>
          <CardDescription>
            รหัสวิชา: {course.courseId} · ผู้สอน:{" "}
            {course.instructors.join(", ")}
          </CardDescription>
        </div>

        {enrolledAt ? (
          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-purple-950 dark:text-purple-300">
            ลงทะเบียนแล้ว
          </Badge>
        ) : (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-amber-950 dark:text-amber-300">
            เปิดรับ
          </Badge>
        )}
      </CardHeader>

      <CardContent>
        {enrolledAt && (
          <div className="text-xs text-muted-foreground space-y-1 mt-2">
            <p>ชื่อ นศ.: {"กิตติภพ อินทำ"}</p>
            <p>โปรแกรม: {student.program}</p>
            <p>ลงทะเบียนเมื่อ: {formatBuddhistDateTime(enrolledAt)}</p>
          </div>
        )}

        {enrolledAt && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onUnregister}
            className="absolute bottom-4 right-4 text-destructive hover:text-destructive hover:bg-destructive/10">
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
