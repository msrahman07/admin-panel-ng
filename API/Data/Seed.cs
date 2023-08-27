using API.Enums;
using API.Models;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (!context.Employees.Any())
            {
                var employees = new List<Employee>
                {
                    new Employee
                    {
                        Id=Guid.NewGuid().ToString(),
                        FirstName="Sara",
                        LastName="Andersen",
                        Email="sara.andersen@mycorp.com",
                        Picture="https://randomuser.me/api/portraits/women/58.jpg",
                    },
                    new Employee
                    {
                        Id=Guid.NewGuid().ToString(),
                        FirstName="Edita",
                        LastName="Vestering",
                        Email="edita.vestering@mycorp.com",
                        Picture="https://randomuser.me/api/portraits/med/women/89.jpg",
                    },
                    new Employee
                    {
                        Id=Guid.NewGuid().ToString(),
                        FirstName="Adina",
                        LastName="Barbosa",
                        Email="adina.barbosa@mycorp.com",
                        Picture="https://randomuser.me/api/portraits/med/women/28.jpg",
                    },
                    new Employee
                    {
                        Id=Guid.NewGuid().ToString(),
                        FirstName="Roberto",
                        LastName="Vega",
                        Email="roberto.vega@mycorp.com",
                        Picture="https://randomuser.me/api/portraits/med/men/25.jpg",
                    },
                    new Employee
                    {
                        Id=Guid.NewGuid().ToString(),
                        FirstName="Rudi",
                        LastName="Droste",
                        Email="rudi.droste@mycorp.com",
                        Picture="https://randomuser.me/api/portraits/med/men/83.jpg",
                    }
                };

                await context.Employees.AddRangeAsync(employees);
                await context.SaveChangesAsync();
            }

            if (!context.Customers.Any())
            {
                var customers = new List<Customer>
                {
                    new Customer
                    {
                        Id=Guid.NewGuid().ToString(),
                        FirstName="Carolina",
                        LastName="Lima",
                        Email="carolina.lima@mycorp.com",
                        Picture="https://randomuser.me/api/portraits/med/women/5.jpg",
                    },
                    new Customer
                    {
                        Id=Guid.NewGuid().ToString(),
                        FirstName="Emre",
                        LastName="Asikoglu",
                        Email="emre.asikoglu@mycorp.com",
                        Picture="https://randomuser.me/api/portraits/med/men/23.jpg",
                    },
                    new Customer
                    {
                        Id=Guid.NewGuid().ToString(),
                        FirstName="Kent",
                        LastName="Brewer",
                        Email="kent.brewer@mycorp.com",
                        Picture="https://randomuser.me/api/portraits/med/men/52.jpg",
                    },
                    new Customer
                    {
                        Id=Guid.NewGuid().ToString(),
                        FirstName="Evan",
                        LastName="Carlson",
                        Email="evan.carlson@mycorp.com",
                        Picture="https://randomuser.me/api/portraits/med/men/80.jpg",
                    },
                    new Customer
                    {
                        Id=Guid.NewGuid().ToString(),
                        FirstName="Sibylle",
                        LastName="Leibold",
                        Email="sibylle.leibold@mycorp.com",
                        Picture="https://randomuser.me/api/portraits/med/women/89.jpg",
                    },    
                };

                await context.Customers.AddRangeAsync(customers);
                await context.SaveChangesAsync();
            }

            if (!context.Kanbans.Any())
            {
                var kanbans = new List<Kanban>
                {
                    new Kanban
                    {
                        Todo="Complete Employee feature",
                        Priority=KanbanPriority.Low,
                        Status=KanbanStatus.Completed
                    },
                    new Kanban
                    {
                        Todo="Complete Customer feature",
                        Priority=KanbanPriority.Low,
                        Status=KanbanStatus.Completed
                    },
                    new Kanban
                    {
                        Todo="Complete kanban feature",
                        Priority=KanbanPriority.High,
                        Status=KanbanStatus.InProgress
                    },
                    new Kanban
                    {
                        Todo="Start dashboard project",
                        Priority=KanbanPriority.Moderate,
                        Status=KanbanStatus.New
                    },
                    new Kanban
                    {
                        Todo="Complete Calander feature",
                        Priority=KanbanPriority.High,
                        Status=KanbanStatus.InProgress
                    },
                };
                await context.Kanbans.AddRangeAsync(kanbans);
                await context.SaveChangesAsync();
            }
        }
    }
}