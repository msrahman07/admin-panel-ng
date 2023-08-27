using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public partial class DataContext : DbContext
{
    public DataContext(DbContextOptions<DataContext> options)
        : base(options)
    {
    }
    public DbSet<Employee> Employees { get; set; } = default!;
    public DbSet<Customer> Customers { get; set; } = default!;
    public DbSet<Kanban> Kanbans { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}

// dotnet aspnet-codegenerator controller -name KanbanController -async -api -m Kanban -dc API.Data.DataContext -outDir Controllers