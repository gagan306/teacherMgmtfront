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
// json demo for schedule 
{
    "sections": [
        "CS101",
        "MATH202",
        "ENG301",
        "BIO103"
    ],
    "schedules": {
        "CS101": [
            { "day": "Monday", "time": "08:00 AM", "subject": "CS Basics" },
            { "day": "Monday", "time": "09:00 AM", "subject": "Algorithms" },
            { "day": "Monday", "time": "12:00 PM", "subject": "Lunch Break" },
            { "day": "Tuesday", "time": "08:00 AM", "subject": "Networking" }
        ],
        "MATH202": [
            { "day": "Tuesday", "time": "08:00 AM", "subject": "Calculus I" },
            { "day": "Wednesday", "time": "10:00 AM", "subject": "Linear Algebra" }
        ],
        "ENG301": [
            { "day": "Monday", "time": "10:00 AM", "subject": "English Literature" },
            { "day": "Thursday", "time": "02:00 PM", "subject": "Shakespearean Studies" }
        ],
        "BIO103": [
            { "day": "Wednesday", "time": "09:00 AM", "subject": "Biology 101" },
            { "day": "Friday", "time": "01:00 PM", "subject": "Introduction to Genetics" }
        ]
    }
}
