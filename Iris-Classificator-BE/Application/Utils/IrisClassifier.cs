using System;
using System.IO;
using System.Linq;
using Microsoft.ML;
using Microsoft.ML.Data;

namespace Application.Utils
{
    public class IrisClassifier
    {
        static readonly string _dataPath = Path.Combine(Environment.CurrentDirectory, "Data", "iris.data");

        static readonly string _modelPath =
            Path.Combine(Environment.CurrentDirectory, "Data", "IrisClusteringModel.zip");

        public string Classify(IrisData dataToPredict)
        {
            var mlContext = new MLContext(seed: 0);

            IDataView dataView =
                mlContext.Data.LoadFromTextFile<IrisData>(_dataPath, hasHeader: false, separatorChar: ',');

            string featuresColumnName = "Features";
            var pipeline = mlContext.Transforms
                .Concatenate(featuresColumnName, "SepalLength", "SepalWidth", "PetalLength", "PetalWidth")
                .Append(mlContext.Clustering.Trainers.KMeans(featuresColumnName, numberOfClusters: 3));
            
            var model = pipeline.Fit(dataView);

            using (var fileStream = new FileStream(_modelPath, FileMode.Create, FileAccess.Write, FileShare.Write))
            {
                mlContext.Model.Save(model, dataView.Schema, fileStream);
            }

            var predictor = mlContext.Model.CreatePredictionEngine<IrisData, ClusterPrediction>(model);

            var prediction = predictor.Predict(dataToPredict);
            // Console.WriteLine($"Cluster: {prediction.PredictedClusterId}");
            // Console.WriteLine($"Distances: {string.Join(" ", prediction.Distances)}");
            //
            // Console.WriteLine($"setosa:      {prediction.Distances[0]:0.####}");
            // Console.WriteLine($"versicolor:  {prediction.Distances[1]:0.####}");
            // Console.WriteLine($"virginica:   {prediction.Distances[2]:0.####}");
            string response = "";
            switch (prediction.PredictedClusterId)
            {
                case 1:
                {
                    response = "setosa";
                    break;
                }
                case 2:
                {
                    response = "versicolor";
                    break;
                }
                case 3:
                {
                    response = "virginica";
                    break;
                }
            }

            return response;
        }
    }
}