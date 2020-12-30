using API.Data;
using API.Dtos;
using API.Dtos.Blog;
using API.Entities;
using API.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDataRepository<Blog> _repo;
        private readonly IMapper _mapper;

        public BlogController(DataContext context, IDataRepository<Blog> repo, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<Blog>> GetBlogs()
        {
            var blogs = _context.Blog.ToList().First();
            return await Task.FromResult(blogs);
        }

        // POST: api/Blog
        [HttpPost]
        public async Task<IActionResult> PostBlog(Blog blog)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var postBlog = _mapper.Map<Blog>(blog);
            _repo.Add(postBlog);
            var saveBlog = await _repo.SaveAsync(blog);
            var blogResponse = _mapper.Map<BlogResponseDto>(saveBlog);

            return StatusCode(201, new { blogResponse });
        }
    }
}
