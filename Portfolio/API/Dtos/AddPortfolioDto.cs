using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class AddPortfolioDto
    {

        [Required]
        public string PortfolioName { get; set; }
        public string CreatedAt { get; set; }
    }
}
