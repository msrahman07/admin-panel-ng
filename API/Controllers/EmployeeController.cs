using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;
using API.DTOs;
using API.CloudinaryOps;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IPhotoAccessor _photoAccessor;

        public EmployeeController(DataContext context, IPhotoAccessor photoAccessor)
        {
            _context = context;
            this._photoAccessor = photoAccessor;
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }
            return await _context.Employees.ToListAsync();
        }

        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(string id)
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employee/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmployee(string id, [FromForm] EmployeeCustomerPostReqDto employeeDto)
        {
            if (id != employeeDto.Id)
            {
                return BadRequest();
            }
            var employeeToEdit = await _context.Employees.FindAsync(id);

            if (employeeToEdit == null) return BadRequest();

            var photoUploadResult = new PhotoUploadResult
            {
                Url = "https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_1539,h_1069/https://h-o-m-e.org/wp-content/uploads/2022/04/Blank-Profile-Picture-1.jpg",
                PublicId = null,
            };

            if (employeeDto.PictureFile != null)
            {
                if (employeeToEdit.PictureId != null)
                {
                    await _photoAccessor.DeletePhoto(employeeToEdit.PictureId);
                }
                photoUploadResult = await _photoAccessor.AddPhoto(employeeDto.PictureFile);
            }
            else
            {
                photoUploadResult.Url = employeeToEdit.Picture;
                photoUploadResult.PublicId = employeeToEdit.PictureId;
            }

            _context.Entry(employeeToEdit).State = EntityState.Detached;


            var employee = new Employee
            {
                Id = employeeDto.Id,
                FirstName = employeeDto.FirstName,
                LastName = employeeDto.LastName,
                Email = employeeDto.Email,
                Picture = photoUploadResult.Url,
                PictureId = photoUploadResult.PublicId
            };

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }

        // POST: api/Employee
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmployee([FromForm] EmployeeCustomerPostReqDto employeeDto)
        {
            if (_context.Employees == null)
            {
                return Problem("Entity set 'DataContext.Employees'  is null.");
            }
            var photoUploadResult = new PhotoUploadResult();
            if (employeeDto.PictureFile != null)
            {
                photoUploadResult = await _photoAccessor.AddPhoto(employeeDto.PictureFile);

            }
            else
            {
                {
                    photoUploadResult.Url = "https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_1539,h_1069/https://h-o-m-e.org/wp-content/uploads/2022/04/Blank-Profile-Picture-1.jpg";
                    photoUploadResult.PublicId = null;
                };
            }

            var employee = new Employee
            {
                Id = Guid.NewGuid().ToString(),
                FirstName = employeeDto.FirstName,
                LastName = employeeDto.LastName,
                Email = employeeDto.Email,
                Picture = photoUploadResult.Url,
                PictureId = photoUploadResult.PublicId
            };

            _context.Employees.Add(employee);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (EmployeeExists(employee.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetEmployee", new { id = employee.Id }, employee);
        }

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(string id)
        {
            if (_context.Employees == null)
            {
                return NotFound();
            }
            var employee = await _context.Employees.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }
            if (employee.PictureId != null)
            {
                await _photoAccessor.DeletePhoto(employee.PictureId);
            }

            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(string id)
        {
            return (_context.Employees?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
