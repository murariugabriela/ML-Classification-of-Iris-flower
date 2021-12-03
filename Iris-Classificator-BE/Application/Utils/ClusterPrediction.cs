using Microsoft.ML.Data;

namespace Application.Utils
{
    public class ClusterPrediction
    {
        [ColumnName("PredictedLabel")] public uint PredictedClusterId;

        [ColumnName("Score")] public float[] Distances;
    }
}