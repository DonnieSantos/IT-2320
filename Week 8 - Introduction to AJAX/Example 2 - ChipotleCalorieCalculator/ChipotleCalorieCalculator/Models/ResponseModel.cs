using System;
using System.Collections.Generic;

namespace ChipotleCalorieCalculator.Models
{
    [Serializable]
    public class ResponseModel
    {
        public List<MenuItem> OrderDetails { get; set; }
        public int TotalCalories { get; set; }
    }
}