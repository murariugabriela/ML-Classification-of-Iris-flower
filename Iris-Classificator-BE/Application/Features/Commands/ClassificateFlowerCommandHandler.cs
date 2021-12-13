using System.Threading;
using System.Threading.Tasks;
using Application.Response;
using Application.Utils;
using MediatR;

namespace Application.Features.Commands
{
    public class ClassificateFlowerCommandHandler : IRequestHandler<ClassificateFlowerCommand, Message>
    {
        public async Task<Message> Handle(ClassificateFlowerCommand request, CancellationToken cancellationToken)
        {
            IrisClassifier irisClassifier = new IrisClassifier();
            IrisData irisData = new IrisData();
            irisData.PetalLength = request.PetalHeight;
            irisData.PetalWidth = request.PetalWidth;
            irisData.SepalWidth = request.SepalWidth;
            irisData.SepalLength = request.SepalHeight;

            return new Message(irisClassifier.Classify(irisData));
        }
    }
}