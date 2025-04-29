namespace teacherMgmtfront.ViewModes
{
    public class Classes
    {
        public int Id { get; set; }
        public string ClassName { get; set; }
        public string Shift { get; set; }
        public TimeOnly Duration { get; set; }

        public TimeOnly BreakDuration { get; set; }
    }
}
