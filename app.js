(function($) {


	function getChart() {
		Chart.defaults.font.family = 'DM Sans';

		if(	window.outerWidth > 992	) {
			Chart.defaults.font.size = 14;
		} else {
			Chart.defaults.font.size = 12;
		}

		var chartOptions = {
		  maintainAspectRatio: false,
		  responsive: true,
		  scales: {
		    x: {
		      grid: {
		        display: false,
		      },
		    },
		    y: {
		      display: false,
		    },
		  },
		  elements: {
		    point: {
		      hitRadius: 0,
		      hoverRadius: 0,
		    },
		  },
		 	plugins: {
			  legend: {
			    display: false,
			  },
			  tooltip: {
			  	displayColors: false,
          callbacks: {
            label: function(context) {
              var label = context.dataset.label || '';

              if (label) {
                label += ': ';
              }
              
              if (context.parsed.y !== null) {
                label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
              }

              console.log(context.dataset);
             	
             	return label;
            }
          }
        }
	    },
	    interaction: { mode: 'index' },
		  onHover: function (e) {
		    const points = this.getElementsAtEventForMode( e, 'index', { axis: 'x', intersect: true }, false );
		     if (points.length) {
		     	e.native.target.style.cursor = 'pointer';
		    } else { 
		    	e.native.target.style.cursor = 'default';
		  	}
		  }
		};

		$.ajax({
		  url: "https://samy-ard.github.io/expenses-chart/data.json",
		  type: "POST",
		  dataType: "json",
		  timeout: 10000,
		}).done(function (result) {
			var days = [];
			var values = [];
			var colors = [];

			for( var i in result) {
				days.push(result[i].day);
				values.push(result[i].amount);
				if(result[i].amount < 50) {
					colors.push("#ec775f");
				} else {
					colors.push("#76b5bc");
				}
			}

		  var chartData = {
		    labels: days,
		    datasets: [
		      {
		        backgroundColor: colors,
		        borderColor: colors,
		        data: values,
		        borderRadius: '3',
		        borderSkipped: false
		      },
		    ],
		  };
		  var barChartCanvas = $("#chart").get(0).getContext("2d");
		 	var chart = new Chart(barChartCanvas, {
		    type: "bar",
		    data: chartData,
		    options: chartOptions,
		  });
		});
	}

	getChart();

})(jQuery);
