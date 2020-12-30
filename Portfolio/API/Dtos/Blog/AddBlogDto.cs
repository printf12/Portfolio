using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos.Blog
{
    public class AddBlogDto
    {
        
        public string BlogTitle { get; set; }
        public string BlogDescription { get; set; }
        public string BlogCategory { get; set; }
        public string CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public string BlogImage { get; set; }

    }
}
