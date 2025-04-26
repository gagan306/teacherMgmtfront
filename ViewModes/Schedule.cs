namespace teacherMgmtfront.ViewModes
{
    public class Schedule
    {
        
        public string TeacherName { get; set; }
        public string Subject { get; set; }

        public string SubField { get; set; }
        public string Department { get; set; }
        public string Faculty { get; set; }
        
        public TimeOnly TimeFrom { get; set; }
        public TimeOnly TimeTo { get; set; }
        public DateTime Date { get; set; }
    }
}
