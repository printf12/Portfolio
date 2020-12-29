using Microsoft.AspNetCore.Mvc;
using API.Data;
using API.Controllers;
using System.Collections;
using API.Entities;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using API.Repositories;
using API.Dtos;
using AutoMapper;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDataRepository<User> _repo;
        private readonly IMapper _mapper;

        public UserController(DataContext context, IDataRepository<User> repo, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = _context.User.ToList();
            return await Task.FromResult(users);
        }
        // api/users/3
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserAsync(int id)
        {
            return await _context.User.FindAsync(id);
        }


       
    }
}