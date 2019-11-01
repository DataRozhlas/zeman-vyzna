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
