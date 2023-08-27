using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Enums;

namespace API.Models
{
    public class Kanban
    {
        public int Id { get; set; }
        public string Todo { get; set; } = null!;
        public KanbanPriority Priority { get; set; }
        public KanbanStatus Status { get; set; }
    }
}