using API.Data;
using API.Dtos;
using API.Entities;
using API.Repositories;
using AutoMapper;
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
    private readonly IDataRepository<User> _repo;
    private readonly IMapper _mapper;

    public PortfolioController(DataContext context, IDataRepository<User> repo, IMapper mapper)
        {
        _context = context;
        _mapper = mapper;
        _repo = repo;
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

    // POST: api/Potfolio
    [HttpPost]
    public async Task<IActionResult> AddPortfolio([FromBody] AddPortfolioDto addPortfolioDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var portfolio = _mapper.Map<User>(addPortfolioDto);
        _repo.Add(portfolio);
        var savePortfolio = await _repo.SaveAsync(portfolio);
        var portfolioResponse = _mapper.Map<PortfolioResponseDto>(savePortfolio);

        return StatusCode(201, new { portfolioResponse });
    }
}