// bokehPlots.js

function createBokehPlot(data) {
        // Define the data for the pie chart
        let source = new Bokeh.ColumnDataSource({
                data: data,
        });

        // Create a new plot
        let plot = new Bokeh.Plot({
                width: 400,
                height: 400,
                x_range: new Bokeh.Range1d(-1.1, 1.1),
                y_range: new Bokeh.Range1d(-1.1, 1.1),
        });

        // Define the angles for the pie chart
        let angles = data.values.reduce(
                (previousValues, currentValue) => {
                        let previousTotal = previousValues.reduce(
                                (a, b) => a + b,
                                0
                        );
                        return [
                                ...previousValues,
                                previousTotal + 2 * Math.PI * currentValue,
                        ];
                },
                [0]
        );

        // Create the pie chart
        let pie = new Bokeh.Wedge({
                x: 0,
                y: 0,
                radius: 1,
                start_angle: { field: "start_angle" },
                end_angle: { field: "end_angle" },
                fill_color: { field: "color" },
                line_color: "white",
        });

        // Add the pie chart to the plot
        plot.add_glyph(pie, source);

        return plot;
}
