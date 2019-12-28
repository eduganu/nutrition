export class RadarChartParams{

    type = "radar";
    data = {
      labels: ["Energy", "Carbohydrate", "Total Fat", "Saturated Fat", "Sugars", "Salt", "Protein"],
      datasets:[{
        label:"Relative to daily Percentage",
        data: [],
        backgroundColor: 'rgb(30, 130, 140, 0.2)',
        borderColor: 'rgb(30, 130, 140, 0.8)'
      }],
    };
    options = {
      scale: {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100
        }
      },
    }
}