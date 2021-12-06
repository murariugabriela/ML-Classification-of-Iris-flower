using Microsoft.AspNetCore.Http;
using Microsoft.ML.Data;

namespace Application.Utils
{
    public class ImageData
    {
        [LoadColumn(0)]
        public IFormFile ImagePath;

        [LoadColumn(1)]
        public string Label;
    }
}