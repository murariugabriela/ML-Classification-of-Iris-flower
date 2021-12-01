import React from 'react';
import '../../custom.css'
import './contact.css'
import {Autocomplete, Avatar, Box, Tab, Tabs, TextField, Typography} from "@mui/material";
import InputComponent from "../../utils/inputComponent";

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
        {label: 'Doboș Alexandru-Cristian', email: "alexandru.dobos@info.uaic.ro"},
        {label: 'Murariu Gabriela', email: "gabriela.murariu@info.uaic.ro"},
        {label: 'Ursachi Gabriela', email: "gabriela.ursachi@info.uaic.ro"},
        {label: 'Zet Teodor', email: "teodor.zet@info.uaic.ro"},
    ];
    const [value, setValue] = React.useState('1');
    const [email, setEmail] = React.useState('');
    const [messageBody, setMessageBody] = React.useState('');
    const [senderEmail, setSenderEmail] = React.useState("");
    const [client, setClient] = React.useState('');
    const [response, setResponse] = React.useState('');
    const [fieldEmail, setFieldEmail] = React.useState(false);
    const [fieldName, setFieldName] = React.useState(false);
    const [fieldMessage, setFieldMessage] = React.useState(false);


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSubmit =  (e) => {
            e.preventDefault();
            
            if (!fieldEmail && !fieldName && !fieldMessage){
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
                    .then(data => {console.log(data); setResponse(data.message)})
                    .catch(error => console.log(error));
            }
            
            
        }
    
    
    return (
        <div className={"pageLayout"}>
            <h2>Contact</h2>
            <div style={{display: "flex", justifyContent: "space-evenly", width: "90%", alignContent: "center", paddingTop: "5%"}}>
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
                    }} id={"to"} value={email}
                           readOnly/>
                    <InputComponent height={"40px"} type={"email"} id={"from"} value={senderEmail}
                                    setValue={setSenderEmail}
                                    label={"Your Email"} readOnly={"False"} error = {fieldEmail} setError = {setFieldEmail}/>

                    <InputComponent height={"40px"} type={"text"} id={"name"} value={client}
                                    setValue={setClient}
                                    label={"Your Name"} readOnly={"False"}
                                    error = {fieldName} setError = {setFieldName}/>

                    <InputComponent height={"80px"} type={"text"} id={"message"} value={messageBody}
                                    setValue={setMessageBody} label={"Message"} readOnly={"False"}
                                    error = {fieldMessage} setError = {setFieldMessage}/>
                    <button style={{height: "30px", backgroundColor: "#c5b2ec", border: "none"}} onClick={handleSubmit}>
                        Send
                    </button>
                </form>
                <div>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example"
                    >
                        <Tab icon={<Avatar alt={"Alex"} src={"Picture2.png"}/>} value="1"
                             label="Doboș Alexandru-Cristian"/>
                        <Tab icon={<Avatar alt={"Alex"} src={"Picture2.png"}/>} value="2" label="Murariu Gabriela"/>
                        <Tab icon={<Avatar alt={"Alex"} src={"Picture2.png"}/>} value="3" label="Ursachi Gabriela"/>
                        <Tab icon={<Avatar alt={"Alex"} src={"Picture2.png"}/>} value="4" label="Zet Teodor"/>
                    </Tabs>
                    <TabPanel value={value} index={"1"}>
                        cristian.dobos@info.uaic.ro
                    </TabPanel>
                    <TabPanel value={value} index={"2"}>
                        gabriela.murariu@info.uaic.ro
                    </TabPanel>
                    <TabPanel value={value} index={"3"}>
                        gabriela.ursachi@info.uaic.ro
                    </TabPanel>
                    <TabPanel value={value} index={"4"}>
                        teodor.zet@info.uaic.ro
                    </TabPanel>
                </div>
            </div>
        </div>
    );
}
