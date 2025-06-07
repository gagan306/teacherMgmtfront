namespace teacherMgmtfront.ViewModes
{
    public class Classes
    {
       
        public string ClassName { get; set; }
        public string Shift { get; set; }
        public string Stream { get; set; }
        public TimeOnly Duration { get; set; }

        public TimeOnly BreakDuration { get; set; }
    }
    public class ClassDto
    {
        public int? ClassId { get; set; }
        public string ClassName { get; set; }
        public string Faculty { get; set; }
        public string Shift { get; set; }
        public int Duration { get; set; }
        public int BreakDuration { get; set; }
        public string Batch { get; set; }

        // Use string for TimeFrom and TimeTo for JSON compatibility
        public string TimeFrom { get; set; }
        public string TimeTo { get; set; }
    }
    public class DeleteRequest
    {
        public int Id { get; set; }
    }

}
