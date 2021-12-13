using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.ML;
using Microsoft.ML.Data;

namespace Application.Utils
{
    public class ImageClassifier
    {
        static readonly string _imagesFolder = Path.Combine(Environment.CurrentDirectory, "Data", "iris-images");

        static readonly string _inceptionTensorFlowModel = Path.Combine(Environment.CurrentDirectory, "Data",
            "inception", "tensorflow_inception_graph.pb");

        static readonly string _trainTagsTsv = Path.Combine(Environment.CurrentDirectory, "Data", "tags.tsv");
        static readonly string _testTagsTsv = Path.Combine(Environment.CurrentDirectory, "Data", "test-tags.tsv");

        public string ClassifyImage(ImageDataPredict dataToPredict)
        {
            MLContext mlContext = new MLContext();
            ITransformer model = GenerateModel(mlContext);


            Console.WriteLine(dataToPredict + "\n");
            return ClassifySingleImage(mlContext, model, dataToPredict);
        }

        public static ITransformer GenerateModel(MLContext mlContext)
        {
            IEstimator<ITransformer> pipeline = mlContext.Transforms.LoadImages(outputColumnName: "input",
                    imageFolder: _imagesFolder, inputColumnName: nameof(ImageDataPredict.ImagePath))
                // The image transforms transform the images into the model's expected format.
                .Append(mlContext.Transforms.ResizeImages(outputColumnName: "input",
                    imageWidth: InceptionSettings.ImageWidth, imageHeight: InceptionSettings.ImageHeight,
                    inputColumnName: "input"))
                .Append(mlContext.Transforms.ExtractPixels(outputColumnName: "input",
                    interleavePixelColors: InceptionSettings.ChannelsLast, offsetImage: InceptionSettings.Mean))
                // The ScoreTensorFlowModel transform scores the TensorFlow model and allows communication
                .Append(mlContext.Model.LoadTensorFlowModel(_inceptionTensorFlowModel).ScoreTensorFlowModel(
                    outputColumnNames: new[] {"softmax2_pre_activation"}, inputColumnNames: new[] {"input"},
                    addBatchDimensionInput: true))
                .Append(mlContext.Transforms.Conversion.MapValueToKey(outputColumnName: "LabelKey",
                    inputColumnName: "Label"))
                .Append(mlContext.MulticlassClassification.Trainers.LbfgsMaximumEntropy(labelColumnName: "LabelKey",
                    featureColumnName: "softmax2_pre_activation"))
                .Append(mlContext.Transforms.Conversion.MapKeyToValue("PredictedLabelValue", "PredictedLabel"))
                .AppendCacheCheckpoint(mlContext);

            IDataView trainingData =
                mlContext.Data.LoadFromTextFile<ImageDataPredict>(path: _trainTagsTsv, hasHeader: false);
            // Train the model
            Console.WriteLine("=============== Training classification model ===============");
            // Create and train the model
            ITransformer model = pipeline.Fit(trainingData);
            // Generate predictions from the test data, to be evaluated
            IDataView testData =
                mlContext.Data.LoadFromTextFile<ImageDataPredict>(path: _testTagsTsv, hasHeader: false);
            IDataView predictions = model.Transform(testData);
            // Create an IEnumerable for the predictions for displaying results
            IEnumerable<ImagePrediction> imagePredictionData =
                mlContext.Data.CreateEnumerable<ImagePrediction>(predictions, true);
            // DisplayResults(imagePredictionData);
            // Get performance metrics on the model using training data
            Console.WriteLine("=============== Classification metrics ===============");
            MulticlassClassificationMetrics metrics =
                mlContext.MulticlassClassification.Evaluate(predictions,
                    labelColumnName: "LabelKey",
                    predictedLabelColumnName: "PredictedLabel");
            Console.WriteLine($"LogLoss is: {metrics.LogLoss}");
            Console.WriteLine(
                $"PerClassLogLoss is: {String.Join(" , ", metrics.PerClassLogLoss.Select(c => c.ToString()))}");
            return model;
        }

        public static string ClassifySingleImage(MLContext mlContext, ITransformer model, ImageDataPredict imageToPredict)
        {
            // load the fully qualified image file name into ImageData
            var imageData = new ImageDataPredict()
            {
                ImagePath = imageToPredict.ImagePath
            };
            // Make prediction function (input = ImageData, output = ImagePrediction)
            var predictor = mlContext.Model.CreatePredictionEngine<ImageDataPredict, ImagePrediction>(model);
            var prediction = predictor.Predict(imageData);
            Console.WriteLine("=============== Making single image classification ===============");
            Console.WriteLine(
                $"Image: {Path.GetFileName(imageData.ImagePath)} predicted as: {prediction.PredictedLabelValue} with score: {prediction.Score.Max()} ");
            return prediction.PredictedLabelValue;
        }
    }
}