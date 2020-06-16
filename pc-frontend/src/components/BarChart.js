import React from "react";
import { TimeSeries, Index, sum, max } from "pondjs";
import { Charts, ChartContainer, ChartRow, YAxis, BarChart, Resizable, styler } from "react-timeseries-charts";


class MyBarChart extends React.Component {
    render() {
        const style = styler([{ key: "value", color: "#0288d1 ", selected: "#0288d1" }]);
        let data = this.props.metrics.map(item => [item.timestamp, 1]);
        if (data.length === 0) {
            data = [["2020-01-01T00:00", 0]];
        }

        const series = new TimeSeries({
            name: "People Traffic",
            columns: ["index", "value"],
            points: data.map(([d, value]) => [Index.getIndexString("1h", new Date(d)), value])
        });

        const newSeries = series.fixedWindowRollup({
            windowSize: '1d',
            aggregation: {index: {index: sum()}, value: {value: sum()}}
        });
        const maxValue = newSeries.max('value')

        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <b>Persons per Day</b>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <Resizable>
                            <ChartContainer timeRange={newSeries.range()}>
                                <ChartRow height="300" title="People Traffic">
                                    <YAxis
                                        id="count"
                                        label="Count"
                                        min={0}
                                        max={maxValue}
                                        format=".2f"
                                        width="70"
                                        type="linear"
                                    />
                                    <Charts>
                                        <BarChart
                                            axis="count"
                                            style={style}
                                            spacing={1}
                                            columns={["value"]}
                                            series={newSeries}
                                            minBarHeight={1}
                                        />
                                    </Charts>
                                </ChartRow>
                            </ChartContainer>
                        </Resizable>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyBarChart;
