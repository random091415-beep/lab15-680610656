import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus } from "lucide-react";
import type { Course, Student, Enrollment } from "@/lib/types";

type RegisterDialogProps = {
  courses?: Course[];
  enrollments?: Enrollment[];
  student?: Student;
  onRegister?: (courseId: string, time: string) => void;
};

export function RegisterDialog({
  courses = [],
  enrollments = [],
  onRegister,
}: RegisterDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    if (open) {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      setTime(`${hours}:${minutes}`);
    }
  }, [open]);

  const availableCourses = courses.filter(
    (course) => !enrollments.some((e) => e.courseId === course.courseId),
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedCourseId) return;

    if (onRegister) {
      onRegister(selectedCourseId, time);
    }

    setSelectedCourseId("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="flex items-center gap-2">
          <UserPlus className="w-4 h-4" />
          ลงทะเบียน
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold">
              ลงทะเบียนเรียน
            </DialogTitle>
            <DialogDescription>
              เลือกวิชาที่ต้องการลงทะเบียน แล้วกรอกข้อมูลให้ครบ
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-1.5">
            <Label htmlFor="courseSelect" className="font-semibold">
              วิชา
            </Label>
            <select
              id="courseSelect"
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring">
              <option value="" disabled>
                เลือกวิชา
              </option>
              {availableCourses.map((course) => (
                <option key={course.courseId} value={course.courseId}>
                  {course.courseId} - {course.courseTitle}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="timeInput" className="font-semibold">
              เวลา
            </Label>
            <Input
              id="timeInput"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="studentName" className="font-semibold">
              ชื่อ นศ.
            </Label>
            <Input
              id="studentName"
              value={"กิตติภพ อินทำ"}
              readOnly
              className="bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="program" className="font-semibold">
              โปรแกรม
            </Label>
            <Input
              id="program"
              value={"CPE"}
              readOnly
              className="bg-muted text-muted-foreground cursor-not-allowed"
            />
          </div>

          <DialogFooter className="pt-2 border-t">
            <Button type="submit" disabled={!selectedCourseId}>
              ยืนยันการลงทะเบียน
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
