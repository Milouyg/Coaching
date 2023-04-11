class ChartWrapper {
    constructor(id, labels, data, backgroundColors) {
      this.id = id;
      this.labels = labels;
      this.datasets = [
        {
          label: "most played consoles in hours",
          data: data,
          backgroundColor: backgroundColors,
        },
      ];
    }
  
    render() {
      const config = {
        type: "radar",
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {},
      };
  
      const chart = new Chart(
        document.getElementById(this.id),
        config
      );
  
      return chart;
    }
  }
  
  // Example usage:
  const labels = [
    "playstation 3",
    "nintendo DS",
    "playstation 4",
    "nintendo switch",
    "playstation 3",
    "nintendo DS",
    "playstation 4",
  ];
  
  const data = [1100, 700, 2000, 800, 1100, 700, 2000, 1200];
  const backgroundColors = ["#83c3c166"];
  
  const myChart = new ChartWrapper("js--chart--1", labels, data, backgroundColors);
  myChart.render();
  