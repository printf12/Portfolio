using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class PortfolioResponseDto
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
        public string Titel { get; set; }
    }
}
