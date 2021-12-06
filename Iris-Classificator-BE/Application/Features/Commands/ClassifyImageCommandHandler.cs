using System;
using System.IO;
using MediatR;
using System.Threading;
using System.Threading.Tasks;
using Application.Response;
using Application.Utils;

namespace Application.Features.Commands
{
    public class ClassifyImageCommandHandler : IRequestHandler<ClassifyImageCommand, Message>
    {
        public async Task<Message> Handle(ClassifyImageCommand request, CancellationToken cancellationToken)
        {
            ImageClassifier irisClassifier = new ImageClassifier();

            var filePath = Path.GetTempFileName() + Guid.NewGuid().ToString() + ".jpg";;
            //Save image to temp
            using (var ms = new FileStream(filePath, FileMode.Create))
            {
                await request.ImagePath.CopyToAsync(ms);
            }
            ImageDataPredict irisData = new ImageDataPredict();
            irisData.ImagePath = filePath;
            irisData.Label = request.Label;
            return new Message(irisClassifier.ClassifyImage(irisData));
        }
    }
}