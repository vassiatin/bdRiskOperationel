"use strict";
var demo_dashboard = {
    init: function () {
        var e = !1;
        app._loading.show($("#dashboard-budget-card"), {spinner: !0}), setTimeout(function () {
            e = echarts.init(document.getElementById("dashboard-ec-radar"));
            var a = {
                tooltip: {backgroundColor: "rgba(0,0,0,0.5)", padding: 10, textStyle: {fontSize: 11}},
                legend: {data: ["Allocated Budget", "Actual Spending"]},
                grid: {top: "10px", left: "0px", bottom: "30px", right: "0px"},
                radar: {
                    name: {
                        textStyle: {
                            color: "#fff",
                            backgroundColor: "rgba(0, 0, 0, 0.1)",
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: [{name: "Sales", max: 6500, color: "#91969a"}, {
                        name: "Managers",
                        max: 16e3,
                        color: "#91969a"
                    }, {name: "IT", max: 3e4, color: "#91969a"}, {
                        name: "Support",
                        max: 38e3,
                        color: "#91969a"
                    }, {name: "Development", max: 52e3, color: "#91969a"}, {
                        name: "Marketing",
                        max: 25e3,
                        color: "#91969a"
                    }]
                },
                series: [{
                    name: "Budget vs spending",
                    type: "radar",
                    data: [{
                        value: [4300, 1e4, 28e3, 35e3, 5e4, 19e3],
                        name: "Allocated budget",
                        lineStyle: {color: "rgba(0, 138, 190, 1)"}
                    }, {
                        value: [5e3, 14e3, 28e3, 31e3, 42e3, 21e3],
                        name: "Actual spending",
                        lineStyle: {color: "rgba(255, 30, 30, 1)"}
                    }]
                }]
            };
            a && "object" == typeof a && e.setOption(a, !0), app._loading.hide($("#dashboard-budget-card")), window.addEventListener("resize", function () {
                e.resize()
            })
        }, 1e3), app._loading.show($("#dashboard-orders-card"), {spinner: !0});
        var a = !1;
        setTimeout(function () {
            a = echarts.init(document.getElementById("dashboard-ec-line"));
            var e = {
                tooltip: {
                    trigger: "axis",
                    backgroundColor: "rgba(0,0,0,0.5)",
                    padding: 10,
                    position: function (e) {
                        return [e[0], "10%"]
                    },
                    axisPointer: {
                        animation: !1,
                        type: "cross",
                        lineStyle: {color: "#ff1e1e", width: 1, opacity: .5},
                        label: {backgroundColor: "#ff1e1e", borderColor: "rgba(0,0,0,0.3)", shadowColor: "#ff1e1e"},
                        crossStyle: {color: "#ff1e1e"}
                    },
                    textStyle: {fontSize: 11}
                },
                grid: {top: "10px", left: "35px", bottom: "30px", right: "16px"},
                xAxis: {
                    type: "category",
                    boundaryGap: !1,
                    data: ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"],
                    axisLine: {lineStyle: {color: "#91969a"}},
                    splitLine: {show: !0, lineStyle: {color: "rgba(0,0,0,0.3)", opacity: .5}}
                },
                yAxis: {
                    type: "value",
                    axisLine: {lineStyle: {color: "#91969a"}},
                    splitLine: {show: !0, lineStyle: {color: "rgba(0,0,0,0.3)", opacity: .5}},
                    boundaryGap: [0, "100%"]
                },
                series: [{
                    name: "Sales",
                    type: "line",
                    smooth: !0,
                    symbol: "none",
                    sampling: "average",
                    itemStyle: {normal: {color: "rgba(0, 138, 190, 1)"}},
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "rgba(0, 138, 190, 1)"
                            }, {offset: 1, color: "rgba(0, 138, 190, 0.1)"}])
                        }
                    },
                    data: ["43", "47", "58", "54", "63", "38", "33", "39", "45", "50", "48", "58"]
                }, {
                    name: "Processed orders",
                    type: "line",
                    smooth: !0,
                    symbol: "none",
                    sampling: "average",
                    itemStyle: {normal: {color: "rgba(255, 30, 30, 1)"}},
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: "rgba(255, 30, 30, 1)"
                            }, {offset: 1, color: "rgba(255, 30, 30, 0.1)"}])
                        }
                    },
                    data: ["40", "42", "55", "49", "52", "34", "29", "34", "39", "48", "45", "52"]
                }]
            };
            e && "object" == typeof e && a.setOption(e, !0), app._loading.hide($("#dashboard-orders-card")), window.addEventListener("resize", function () {
                a.resize()
            })
        }, 1e3);
        var o = moment().subtract(29, "days"), t = moment();
        $("#dashboard-rp-customrange").daterangepicker({
            startDate: o,
            endDate: t,
            drops: "down",
            opens: "left",
            alwaysShowCalendars: !0,
            ranges: {
                Today: [moment(), moment()],
                Yesterday: [moment().subtract(1, "days"), moment().subtract(1, "days")],
                "7 Derniers Jours": [moment().subtract(6, "days"), moment()],
                "30 Derniers Jours": [moment().subtract(29, "days"), moment()],
                "Ce mois": [moment().startOf("month"), moment().endOf("month")],
                "Mois passé": [moment().subtract(1, "month").startOf("month"), moment().subtract(1, "month").endOf("month")]
            }
        }, function (e, a) {
            $("#dashboard-rp-customrange").html(e.format("MMMM D, YYYY") + " - " + a.format("MMMM D, YYYY")), app._loading.show($("#dashboard-orders-card"), {spinner: !0}), setTimeout(function () {
                app._loading.hide($("#dashboard-orders-card"));
                alert(e.format("Y-m-d")+" "+a);
                //Ici on appelle la fonction ajax


            }, 1e3)
        }), function (e, a) {
            $("#dashboard-rp-customrange").html(e.format("MMMM D, YYYY") + " - " + a.format("MMMM D, YYYY"))
        }(o, t), $(".dashboard_rating").raty({readOnly: !0})
    }
};
document.addEventListener("DOMContentLoaded", function () {
    demo_dashboard.init()
});