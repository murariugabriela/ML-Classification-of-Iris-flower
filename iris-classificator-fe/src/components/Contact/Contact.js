import React from 'react';
import '../../custom.css'
import './contact.css'
import {Autocomplete, Avatar, Box, Tab, Tabs, TextField, Typography} from "@mui/material";
import InputComponent from "../../utils/inputComponent";
import SnackbarComponent from "../../utils/SnackbarComponent";

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            className={"userContact"}
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{p: 3}}>
                    <Typography style={{width: "inherit"}}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

export default function Contact() {
    const users = [
        {label: 'Doboș Alexandru-Cristian', email: "cristian.dobos@info.uaic.ro"},
        {label: 'Murariu Gabriela', email: "gabriela.murariu@info.uaic.ro"},
        {label: 'Ursachi Gabriela', email: "gabriela.ursachi@info.uaic.ro"},
        {label: 'Zet Teodor', email: "teodor.zet@info.uaic.ro"},
    ];
    const [value, setValue] = React.useState("1");
    const [email, setEmail] = React.useState('');
    const [messageBody, setMessageBody] = React.useState('');
    const [senderEmail, setSenderEmail] = React.useState("");
    const [client, setClient] = React.useState('');
    const [fieldEmail, setFieldEmail] = React.useState(false);
    const [fieldName, setFieldName] = React.useState(false);
    const [fieldMessage, setFieldMessage] = React.useState(false);
    const [openAlert, setOpenAlert] = React.useState(false);
    const [alertMessage, setAlertMessage] = React.useState("");
    const [alertSeverity, setAlertSeverity] = React.useState("success");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if ((!fieldEmail && !fieldName && !fieldMessage) && (email !== "" && messageBody !== "" && client !== "")) {
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': "*/*"
                },
                body: JSON.stringify({
                    to: email,
                    from: senderEmail,
                    name: client,
                    message: messageBody
                }),
            };

            fetch('http://localhost:5287/api/1.0/Contact', requestOptions)
                .then(response => response.json())
                .then(data => {
                    setAlertMessage("Email successfully sent!");
                    setAlertSeverity("success");
                    setOpenAlert(true);
                    console.log(data);
                })
                .catch(error => {
                    setAlertMessage("Something went wrong");
                    setAlertSeverity("error");
                    setOpenAlert(true);
                    console.log(error);
                });
        } else {

            if (senderEmail === "") {
                document.getElementById("fromMessage").textContent = "You should enter a valid email";
            }
            if (client === "") {
                document.getElementById("nameMessage").textContent = "This field should not be empty";
            }
            if (messageBody === "") {
                document.getElementById("messageMessage").textContent = "This field should not be empty";
            }
            if (email === "") {
                setOpenAlert(true)
                setAlertSeverity("error")
                setAlertMessage("You should choose an email to send to")
            } else {
                setOpenAlert(true)
                setAlertSeverity("error")
                setAlertMessage("Check the fields requirements")
            }
        }
    }


    return (
        <div className={"pageLayout"}>
            <h2>Contact</h2>
            <div id={"page_content"} style={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "90%",
                alignContent: "center",
                paddingTop: "5%"
            }}>
                <form className={"contactForm"}>
                    <Autocomplete
                        disablePortal
                        id={"usersEmails"}
                        options={users}
                        getOptionLabel={(option) => option.label}
                        onChange={(event, user) => {
                            if (user) {
                                setEmail(user.email)
                            } else setEmail("")
                        }}
                        sx={{width: 300}}
                        renderInput={(params) => <TextField {...params} label="Email to"/>}
                    />
                    <label htmlFor={"to"}>
                        Email
                    </label>
                    <input style={{
                        height: "40px",
                        padding: "5px",
                        backgroundColor: "transparent",
                        border: "2px solid #d5c7f1"
                    }} id={"to"} value={email} readOnly required/>
                    <InputComponent height={"40px"} type={"email"} id={"from"} value={senderEmail}
                                    setValue={setSenderEmail}
                                    label={"Your Email"} readOnly={"False"} error={fieldEmail} setError={setFieldEmail}
                                    onChange={handleChange}/>

                    <InputComponent height={"40px"} type={"text"} id={"name"} value={client}
                                    setValue={setClient}
                                    label={"Your Name"} readOnly={"False"}
                                    error={fieldName} setError={setFieldName}
                                    onChange={handleChange}/>

                    <InputComponent height={"80px"} type={"text"} id={"message"} value={messageBody}
                                    setValue={setMessageBody} label={"Message"} readOnly={"False"}
                                    error={fieldMessage} setError={setFieldMessage}
                                    onChange={handleChange}/>
                    <button style={{height: "30px", backgroundColor: "#c5b2ec", border: "none"}} onClick={handleSubmit}>
                        Send
                    </button>
                </form>
                <div>
                    <Tabs
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab icon={<Avatar alt={"Alex"} src={"dobos_alexandru.jpg"}/>} value="1"
                             label="Doboș Alexandru-Cristian"/>
                        <Tab icon={<Avatar alt={"Alex"} src={"murariu_gabriela.png"}/>} value="2"
                             label="Murariu Gabriela"/>
                        <Tab icon={<Avatar alt={"Alex"} src={"ursachi_gabriela.jpeg"}/>} value="3"
                             label="Ursachi Gabriela"/>
                        <Tab icon={<Avatar alt={"Alex"} src={"zet_teodor.jpg"}/>} value="4" label="Zet Teodor"/>
                    </Tabs>
                    <div className={"contact_info"}>
                        <TabPanel value={value} index={"1"}>
                            {/*<div className={"contact_info"}>*/}
                            Student at Faculty of Computer Science, Jassy
                            <br/>
                            Email: cristian.dobos@info.uaic.ro
                            {/*</div>*/}
                        </TabPanel>
                        <TabPanel value={value} index={"2"}>
                            {/*<div className={"contact_info"}>*/}
                            Student at Faculty of Computer Science, Jassy
                            <br/>
                            Email: gabriela.murariu@info.uaic.ro
                            {/*</div>*/}
                        </TabPanel>
                        <TabPanel value={value} index={"3"}>
                            {/*<div className={"contact_info"}>*/}
                            Student at Faculty of Computer Science, Jassy
                            <br/>
                            Email: gabriela.ursachi@info.uaic.ro
                            {/*</div>*/}
                        </TabPanel>
                        <TabPanel value={value} index={"4"}>

                            Student at Faculty of Computer Science, Jassy
                            <br/>
                            Email: teodor.zet@info.uaic.ro

                        </TabPanel>
                    </div>
                </div>
            </div>
            <SnackbarComponent message={alertMessage} open={openAlert} setOpen={setOpenAlert} severity={alertSeverity}/>
        </div>
    );
}
