import React from "react";
import { TimeSeries, Index, sum, max } from "pondjs";
import { Charts, ChartContainer, ChartRow, YAxis, ScatterChart, Resizable, styler } from "react-timeseries-charts";
import { format } from "d3-format";


class MyScatterChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: null,
            highlight: null,
            selection: null,
            tracker: null,
            timerange: '',
        };
        this.formatter = format(".2f");
    }

    handleSelectionChanged = point => {
        this.setState({
            selection: point
        });
    };

    handleMouseNear = point => {
        this.setState({
            highlight: point
        });
    };

    render() {
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
            windowSize: '10min',
            aggregation: { index: { index: sum() }, value: { value: sum() } }
        });

        const maxValue = newSeries.max('value')
        const highlight = this.state.highlight;

        let infoValues = [];
        let text = `Number: -, time: -:--`;
        if (highlight) {
            const numberText = `${this.formatter(highlight.event.get(highlight.column))}`;
            text = `
                Number: ${numberText},
                time: ${this.state.highlight.event.timestamp().toLocaleTimeString()}
            `;
            infoValues = [{ label: "Number", value: numberText }];
        }
        
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <b>Persons per 10min</b>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <Resizable>
                            <ChartContainer
                                timeRange={newSeries.range()}
                                trackerPosition={this.state.tracker}
                                trackerStyle={{
                                    box: {
                                        fill: "black",
                                        color: "#DDD"
                                    },
                                    line: {
                                        stroke: "red",
                                        strokeDasharray: 2
                                    }
                                }}
                                enablePanZoom={true}
                                onBackgroundClick={() => this.setState({ selection: null })}
                                onTrackerChanged={tracker => this.setState({ tracker })}
                            >
                                <ChartRow
                                    height="300"
                                    title="People Traffic"
                                    trackerInfoWidth={125}
                                    trackerInfoHeight={30}
                                    trackerInfoValues={infoValues}
                                    >
                                    <YAxis
                                        id="count-2"
                                        label="Count"
                                        min={0}
                                        max={maxValue}
                                        format=".2f"
                                        width="70"
                                        type="linear"
                                    />
                                    <Charts>
                                        <ScatterChart
                                            axis="count-2"
                                            series={newSeries}
                                            columns={["value"]}
                                            infoHeight={28}
                                            infoWidth={110}
                                            infoStyle={{
                                                fill: "black",
                                                color: "#DDD"
                                            }}
                                            format=".1f"
                                            selected={this.state.selection}
                                            onSelectionChange={
                                                this.handleSelectionChanged
                                            }
                                            onMouseNear={this.handleMouseNear}
                                            highlight={this.state.highlight}
                                            radius={(event, column) =>
                                                column === "value" ? 3 : 2}
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

export default MyScatterChart;
