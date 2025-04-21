# teacherMgmtfront
Core Tables
Teacher
└─ TeacherID (PK)
└─ Name, Email, etc.

Subject
└─ SubjectID (PK)
└─ Name, Description

TeacherQualification
└─ TeacherID (FK → Teacher)
└─ SubjectID (FK → Subject)
(Ensures you only schedule teachers for subjects they can teach.)

Class
└─ ClassID (PK)
└─ Grade, Section,shift,faculty (e.g. “10A”)

Classroom
└─ ClassroomID (PK)
└─ Location, Capacity

Period
└─ PeriodID (PK)
└─ DayOfWeek (Mon–Fri)
└─ SlotNumber (1,2,3…)
└─ StartTime, EndTime

TeacherAvailability
└─ TeacherID (FK → Teacher)
└─ PeriodID (FK → Period)
(One row per slot the teacher can teach.)

Schedule
└─ ScheduleID (PK)
└─ ClassID (FK → Class)
└─ PeriodID (FK → Period)
└─ SubjectID (FK → Subject)
└─ TeacherID (FK → Teacher)
└─ ClassroomID (FK → Classroom)


--  daily pattern 
-- previous class patterns 
-- manual scheduling 
