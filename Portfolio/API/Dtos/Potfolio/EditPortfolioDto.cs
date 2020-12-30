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
        public int Id { get; set; }
        public int Image { get; set; }
        public string Description { get; set; }
        public string Titel { get; set; }
    }
}
