import React from 'react';
import {validateEmail} from "./validate";

export default function  InputComponent(props) {
    // console.log(schema.contactModel)
    const isInitialMount = React.useRef(true);
    React.useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            switch (props.type) {
                case "text":
                    if (props.value === "") {
                        setErrorMessage("This field cannot be empty.")
                        setColor("red")
                        props.setError(true)
                    } else {
                        props.setError(false)
                        setErrorMessage("")
                    }
                    break
                case "email":
                    if (!validateEmail.test(props.value)) {
                        setErrorMessage("You should enter a valid email")
                        setColor("red")
                        props.setError(true)
                    } else {
                        props.setError(false)
                        setErrorMessage("")
                    }
                    break
                default:
                    break
            }
        }
    }, [props.value]);

    function onChangeEvent(event) {
        props.setValue(event.target.value);
    }

    const [color, setColor] = React.useState("green")
    const [errorMessage, setErrorMessage] = React.useState("")
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
                style={{
                    height: props.height,
                    padding: "5px",
                    backgroundColor: "transparent",
                    border: "2px solid #d5c7f1"
                }}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={onChangeEvent}
                required
            />}
            {props.type === "text" && props.label === "Message" &&
            <textarea
                style={{
                    height: props.height,
                    padding: "5px",
                    backgroundColor: "transparent",
                    border: "2px solid #e4dbf6"
                }}
                id={props.id}
                value={props.value}
                onChange={onChangeEvent}
                required
            />}
            {props.type === "text" && props.label !== "Message" &&
            <input
                style={{
                    height: props.height,
                    padding: "5px",
                    backgroundColor: "transparent",
                    border: "2px solid #d5c7f1"
                }}
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={onChangeEvent}
                required
            />}
            {props.error && <p style={{color: color,}}>{errorMessage}</p>}
        </div>

    );
}