using System;

namespace ChipotleCalorieCalculator.Models
{
    [Serializable]
    public class MenuItem
    {
        public string Name { get; set; }
        public string Calories { get; set; }
    }
}