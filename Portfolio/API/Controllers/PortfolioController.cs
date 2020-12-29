using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]

public class PortfolioController : ControllerBase
{
    private readonly DataContext _context;

    public PortfolioController(DataContext context)
    {
        _context = context;
    }

    // GET: api/Portfolio
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Portfolio>>> GetPortfolios()
    {
        var portfolio = _context.Portfolios.OrderBy(p => p.Id).ToList();
        return await Task.FromResult(portfolio);
    }

    // GET:
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserAsync(int id)
    {
        return await _context.User.FindAsync(id);
    }
}