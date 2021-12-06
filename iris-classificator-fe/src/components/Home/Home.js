import React from 'react';
import {Slider} from "@mui/material";
import "./home.css"
import SnackbarComponent from "../../utils/SnackbarComponent";

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
    const [sepalW, setSepalW] = React.useState(0.0);
    const [sepalH, setSepalH] = React.useState(0.0);
    const [petalW, setPetalW] = React.useState(0.0);
    const [petalH, setPetalH] = React.useState(0.0);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertSeverity, setAlertSeverity] = React.useState("success");

    const handleSubmit = (e) => {
        e.preventDefault();
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': "*/*"
            },
            body: JSON.stringify({
                sepalWidth: sepalW,
                sepalHeight: sepalH,
                petalWidth: petalW,
                petalHeight: petalH
            }),
        };
        fetch('http://localhost:5287/api/1.0/IrisClassification', requestOptions)
            .then(res => res.json())
            .then(data => {
                setAlertMessage("Successful classification");
                setAlertSeverity("success");
                setOpenAlert(true);
                console.log(data);
                setResponse(data.message)
            })
            .catch(error => {
                setAlertMessage("Something went wrong");
                setAlertSeverity("error");
                setOpenAlert(true);
                console.log(error)
            });
    }
    const handleInputImage = (file) => {
        if (file.length > 0) {
            var formData = new FormData();

            formData.append("imagePath", file[0])
            formData.append("label", file[0]["name"])
            const requestOptions = {
                method: 'POST',
                body: formData,
            };

            fetch('http://localhost:5287/api/1.0/IrisClassification/Image', requestOptions)
                .then(res => {
                    console.log(res.ok)
                    if (res.ok) {
                        return res.json()
                    } else {
                        setAlertMessage("Something went wrong");
                        setAlertSeverity("error");
                        setOpenAlert(true);
                    }
                })
                .then(data => {
                    console.log(data)
                    if(data) {
                        setAlertMessage("Successful classification");
                        setAlertSeverity("success");
                        setOpenAlert(true);
                        setResponse(data.message)
                    }
                    
                })
                .catch(error => {
                    setAlertMessage("Something went wrong");
                    setAlertSeverity("error");
                    setOpenAlert(true);
                    console.log(error)
                });
        }
    }

    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <div className={"elements_to_predict"} style={{
                paddingLeft: "30px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignContent: "flex-start",
            }}>
                <div style={{
                    width: "100%"
                }}>
                    <h2>Classificator</h2>
                    <h3>Petal width</h3>
                    <Slider marks={marks} onChange={(e, val) => {
                        setPetalW(val)
                    }} value={petalW} step={0.1} max={8} aria-label="Default"
                            valueLabelDisplay="auto"/>
                    <br/>
                    <h3>Petal height</h3>

                    <Slider marks={marks} onChange={(e, val) => {
                        setPetalH(val)
                    }} value={petalH} step={0.1} max={8} aria-label="Default"
                            valueLabelDisplay="auto"/>
                    <br/>

                    <h3>Sepal width</h3>

                    <Slider marks={marks} onChange={(e, val) => {
                        setSepalW(val)
                    }} value={sepalW} step={0.1} max={8} aria-label="Default"
                            valueLabelDisplay="auto"/>
                    <br/>
                    <h3>Sepal heigth</h3>

                    <Slider marks={marks} onChange={(e, val) => {
                        setSepalH(val)
                    }} value={sepalH} step={0.1} max={8} aria-label="Default"
                            valueLabelDisplay="auto"/>
                    <br/>
                    <button style={{height: "40px", width: "30%", backgroundColor: "#c5b2ec", border: "none"}}
                            onClick={handleSubmit}>
                        Send
                    </button>
                </div>
                <div>
                    <form className={"image_form"}>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <label htmlFor={"predictImage"}>
                                <h3>
                                    Or you can choose a file you want to predict
                                </h3>
                            </label>
                            <input type={"file"} name={"predictImage"} id={"predictImage"} max={1}
                                   onChange={(e) => handleInputImage(e.target.files)}
                                    // style={{height: "40px", width: "30%", backgroundColor: "#c5b2ec", border: "none"}}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className={"response"}>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <h3>Iris setosa</h3>
                    <img id={"iris_setosa"} width={"45%"} style={{opacity: response === "setosa" && "100%"}}
                         src={"/Iris_setosa.jpg"} alt={"Iris setosa"}/>
                </div>
                <br/>
                <br/>
                <div style={{display: "flex"}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <h3>Iris virginica</h3>
                        <img id={"iris_verginica"} width={"55%"}
                             style={{opacity: response === "virginica" && "100%"}} src={"/Iris_virginica.jpg"}
                             alt={"Iris virginica"}/>
                    </div>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <h3>Iris versicolor</h3>
                        <img id="iris_versicolor" width={"90%"}
                             style={{opacity: response === "versicolor" && "100%"}} src={"/Iris_Versicolor.jpg"}
                             alt={"Iris versicolor"}/>
                    </div>
                </div>
            </div>
            <SnackbarComponent message={alertMessage} open={openAlert} setOpen={setOpenAlert} severity={alertSeverity}/>
        </div>
    );
}
