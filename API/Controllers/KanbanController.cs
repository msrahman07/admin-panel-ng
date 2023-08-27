using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Models;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KanbanController : ControllerBase
    {
        private readonly DataContext _context;

        public KanbanController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Kanban
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Kanban>>> GetKanbans()
        {
          if (_context.Kanbans == null)
          {
              return NotFound();
          }
            return await _context.Kanbans.ToListAsync();
        }

        // GET: api/Kanban/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Kanban>> GetKanban(int id)
        {
          if (_context.Kanbans == null)
          {
              return NotFound();
          }
            var kanban = await _context.Kanbans.FindAsync(id);

            if (kanban == null)
            {
                return NotFound();
            }

            return kanban;
        }

        // PUT: api/Kanban/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutKanban(int id, Kanban kanban)
        {
            if (id != kanban.Id)
            {
                return BadRequest();
            }

            _context.Entry(kanban).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KanbanExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Kanban
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Kanban>> PostKanban(Kanban kanban)
        {
          if (_context.Kanbans == null)
          {
              return Problem("Entity set 'DataContext.Kanbans'  is null.");
          }
            _context.Kanbans.Add(kanban);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetKanban", new { id = kanban.Id }, kanban);
        }

        // DELETE: api/Kanban/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKanban(int id)
        {
            if (_context.Kanbans == null)
            {
                return NotFound();
            }
            var kanban = await _context.Kanbans.FindAsync(id);
            if (kanban == null)
            {
                return NotFound();
            }

            _context.Kanbans.Remove(kanban);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool KanbanExists(int id)
        {
            return (_context.Kanbans?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
