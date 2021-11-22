import React from 'react';
import {validateEmail} from "./validate";

export default function InputComponent(props) {
    function onChangeEvent(event) {
        switch (props.type) {
            case "text":
                if (event.target.value === "") {
                    console.log("invalid message")
                    setErrorMessage("You should enter a valid message")
                    setColor("red")
                    setError(true)
                } else {
                    setError(false)
                    setErrorMessage("")
                }
                break
            case "email":
                if (!validateEmail.test(event.target.value)) {
                    console.log("invalid email")
                    setErrorMessage("You should enter a valid email")
                    setColor("red")
                    setError(true)
                } else {
                    setError(false)
                    setErrorMessage("")
                }
                break
            default:
                break
        }
        props.setValue(event.target.value);
    }

    const [color, setColor] = React.useState("green")
    const [errorMessage, setErrorMessage] = React.useState("")
    const [error, setError] = React.useState(false)
    return (
        <div style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            paddingTop: "5px",
            paddingBottom: "5px"
        }}>
            <label htmlFor={props.id}>
                {props.label}
            </label>
            {props.type === "email" &&
            <input
                style={{height: props.height, padding: "5px", backgroundColor: "transparent", border: "2px solid #d5c7f1"}}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={onChangeEvent}
                required
            />}
            {props.type === "text" &&
            <textarea
                style={{height: props.height, padding: "5px", backgroundColor: "transparent", border: "2px solid #e4dbf6"}}
                id={props.id}
                value={props.value}
                onChange={onChangeEvent}
                required
            />}
            {error && <p style={{color: color,}}>{errorMessage}</p>}
        </div>

    );
}