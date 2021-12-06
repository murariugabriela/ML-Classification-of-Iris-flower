using Microsoft.ML.Data;

namespace Application.Utils
{
    public class ImageDataPredict
    {
        [LoadColumn(0)]
        public string ImagePath;

        [LoadColumn(1)]
        public string Label;
    }
}