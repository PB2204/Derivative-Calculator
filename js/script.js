function randomInput() {
  var randomValue = [
    "4 * sin(x) + 5 * cos(x / 2)",
    "x * sin(x ^ 2)",
    "x ^ 4 * sin(x)",
    "e ^ sin(x)",
  ];
  var randomExpression = Math.floor(Math.random() * randomValue.length);
  document.getElementById("expression").value = randomValue[randomExpression];
  userInput();
}
function userInput() {
  try {
    var input = document.getElementById("expression").value;
    var expression = math.compile(input);
    var derivative = math.derivative(input, "x");
    var xExpression = math.range(-10, 10, 0.5).toArray();
    var yExpression = xExpression.map(function (x) {
      return expression.evaluate({
        x: x,
      });
    });
    var xDerivative = math.range(-10, 10, 0.5).toArray();
    var yDerivative = xDerivative.map(function (x) {
      return derivative.evaluate({
        x: x,
      });
    });
    var trace1 = {
      x: xExpression,
      y: yExpression,
      mode: "lines",
      name: "y",
    };
    var trace2 = {
      x: xDerivative,
      y: yDerivative,
      mode: "lines",
      name: "y'",
    };
    var data = [trace1, trace2];
    var layout = {
      xaxis: {
        title: "x",
      },
      yaxis: {
        title: "y",
      },
    };
    var config = { responsive: true };
    document.getElementById("derivative").innerHTML = `\`y' = ${derivative}\``;
    MathJax.Hub.Typeset();
    Plotly.newPlot("plot", data, layout, config);
  } catch (error) {
    alert(error);
  }
}
MathJax = window.MathJax;
MathJax.Hub.processSectionDelay = 0;
MathJax.Hub.Config({
  messageStyle: "none",
});
window.onload = randomInput();
document.getElementById("form").onsubmit = function (event) {
  event.preventDefault();
  userInput();
};
