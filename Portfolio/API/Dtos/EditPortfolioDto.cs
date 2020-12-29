using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class EditPortfolioDto
    {
        [Required]
        public int PortfolioId { get; set; }
        [Required]
        public string PortfolioName { get; set; }
        public string createdAt { get; set; }
    }
}
