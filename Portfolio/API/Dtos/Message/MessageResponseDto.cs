using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Message
{
    public class MessageResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string MessageContent { get; set; }
        public string Email { get; set; }
    }
}
