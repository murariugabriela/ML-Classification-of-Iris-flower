import React from 'react';
import {Slider} from "@mui/material";
import "./home.css"

export default function Home() {
    const marks = [
        {
            value: 0,
            label: '0',
        },
        {
            value: 1,
            label: '1',
        },
        {
            value: 2,
            label: '2',
        },
        {
            value: 3,
            label: '3',
        },
        {
            value: 4,
            label: '4',
        },
        {
            value: 5,
            label: '5',
        },
        {
            value: 6,
            label: '6',
        },
        {
            value: 7,
            label: '7',
        },
        {
            value: 8,
            label: '8',
        },
    ];
    const [response, setResponse] = React.useState();
    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accept': "*"
            },
            body: JSON.stringify({
                sepalWidth: 0.0,
                sepalHeight: 0.0,
                petalWidth: 0.0,
                petalHeight: 0.0
            }),
        };
        fetch('http://localhost:5287/api/1.0/IrisClassification', requestOptions)
            .then(response => console.log(response))
        //.then(data => console.log(data));
    }

    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <div style={{
                paddingLeft: "30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "flex-start",
                width: "40%"
            }}>
                <h2>Classificator</h2>
                <h3>Petal width</h3>
                <Slider marks={marks} defaultValue={0.0} step={0.1} max={8} aria-label="Default"
                        valueLabelDisplay="auto"/>
                <br/>
                <h3>Petal height</h3>

                <Slider marks={marks} defaultValue={0.0} step={0.1} max={8} aria-label="Default"
                        valueLabelDisplay="auto"/>
                <br/>

                <h3>Sepal width</h3>

                <Slider marks={marks} defaultValue={0.0} step={0.1} max={8} aria-label="Default"
                        valueLabelDisplay="auto"/>
                <br/>
                <h3>Sepal heigth</h3>

                <Slider marks={marks} defaultValue={0.0} step={0.1} max={8} aria-label="Default"
                        valueLabelDisplay="auto"/>
                <br/>
                <button style={{height: "40px", width: "30%", backgroundColor: "#c5b2ec", border: "none"}}
                        onClick={handleSubmit}>
                    Send
                </button>
            </div>
            <div className={"response"}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <h3>Iris setosa</h3>
                    <img id={"iris_setosa"} width={"45%"} style={{opacity: response === "iris_setosa" && "100%"}}
                         src={"/Iris_setosa.jpg"} alt={"Iris setosa"}/>
                </div>
                <br/>
                <br/>
                <div style={{display: "flex"}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <h3>Iris virginica</h3>
                        <img id={"iris_verginica"} width={"55%"}
                             style={{opacity: response === "iris_virginica" && "100%"}} src={"/Iris_virginica.jpg"}
                             alt={"Iris virginica"}/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <h3>Iris versicolor</h3>
                        <img id="iris_versicolor" width={"90%"}
                             style={{opacity: response === "iris_versicolor" && "100%"}} src={"/Iris_Versicolor.jpg"}
                             alt={"Iris versicolor"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
