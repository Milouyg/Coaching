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
    "Technisch/functioneel (TF)",
    "Algemeen management (AM)",
    "Autonomie/onafhankelijkheid (AU)",
    "Zekerheid en stabiliteit (ZE)",
    "Ondernemingsgerichte creativiteit (OC)",
    "Dienstverlening/toewijding aan de zaak (DV)",
    "Zuivere uitdaging (UI)",
    "Levensstijl (LS)"
  ];
  
  const data = [1100, 700, 2000, 800, 1100, 700, 2000, 1200];
  const backgroundColors = ["#83c3c166"];
  
  const myChart = new ChartWrapper("js--chart--1", labels, data, backgroundColors);
  myChart.render();
  