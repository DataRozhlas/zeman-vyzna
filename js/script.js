import "./byeie"; // loučíme se s IE
import { h, render } from "preact";
/** @jsx h */

let host = "https://data.irozhlas.cz/zeman-vyzna";
if (window.location.hostname === "localhost") {
  host = "http://localhost/zeman-vyzna";
}

function onLoad(e) {
  const data = JSON.parse(e.target.response);
  render((
    <div id="anketa">
      {data.map(el => (
        <div className="respondent">
          <img className="portret" src={host + "/foto/" + el.f} alt={el.p} />
          <div className={"bio" + " " + el.pod}>
            <div className="jmeno">{`${el.j} ${el.p}`}</div>
            <div className="vek">{el.a}</div>
            <div className="vek">{el.v}, {el.r}</div>
            <div className="vek"><em>{el.pod}</em></div>
          </div>
          <div className="odpoved">{el.txt}</div>
          <div className="odpoved"><a href={el.z}>zdroj</a></div>
        </div>
      ))}
    </div>
  ), document.getElementById("anketa-wrapper"));
}

const r = new XMLHttpRequest();
r.addEventListener("load", onLoad);
r.open("GET", host + "/data/data.json");
r.send();

//graf
Highcharts.chart('vyvoj', {
  chart: {
      type: 'column'
  },
  title: {
      text: 'Přehled oceněných příznivců Miloše Zemana'
  },
  subtitle: {
    text: 'Přehled ukazuje množství státních vyznamenání, které putovaly do rukou Zemanových blízkých.'
  },
  credits: {
    enabled: false,
  },
  xAxis: {
      categories: [2013, 2014, 2015, 2016, 2017, 2018, 2019]
  },
  yAxis: {
      min: 0,
      title: {
          text: 'Počet oceněných'
      },
      stackLabels: {
          enabled: true,
          style: {
              fontWeight: 'bold',
              color: ( // theme
                  Highcharts.defaultOptions.title.style &&
                  Highcharts.defaultOptions.title.style.color
              ) || 'gray'
          }
      }
  },
  legend: {
      align: 'right',
      //x: -30,
      verticalAlign: 'top',
      //y: 25,
      floating: false,
      backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
  },
  tooltip: {
    enabled:false,
  },
  plotOptions: {
    series: {
      animation: false,
      enableMouseTracking: false,
    },
      column: {
          stacking: 'normal',
          dataLabels: {
              enabled: true
          }
      }
  },
  series: [{
      name: 'ostatní',
      data: [
        14,
        19,
        23,
        16,
        21,
        17,
        31,
      ],
      color: '#1f78b4'
  }, {
    name: 'příznivci',
    data: [
      15,
      8,
      10,
      8,
      11,
      17,
      11,
    ],
    color: '#33a02c'
}]
});
