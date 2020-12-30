using API.Data;
using API.Dtos.Message;
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
    public class MessageController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IDataRepository<Message> _repo;
        private readonly IMapper _mapper;

        public MessageController(DataContext context, IDataRepository<Message> repo, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
            _repo = repo;
        }

        [HttpGet]
        public async Task<ActionResult<Message>> GetMessages()
        {
            var messages = _context.Message.ToList().First();
            return await Task.FromResult(messages);
        }

        // POST: api/Message
        [HttpPost]
        public async Task<IActionResult> PostMessage(Message message)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var postMessage = _mapper.Map<Message>(message);
            _repo.Add(postMessage);
            var saveMessage = await _repo.SaveAsync(message);
            var MessageResponse = _mapper.Map<MessageResponseDto>(saveMessage);

            return StatusCode(201, new { MessageResponse });
        }
    }
}
