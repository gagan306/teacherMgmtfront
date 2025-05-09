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
        public string ClassName { get; set; }
        public string Faculty { get; set; }
        public string Shift { get; set; }
        public int Duration { get; set; }
        public int BreakDuration { get; set; }
    }
}
