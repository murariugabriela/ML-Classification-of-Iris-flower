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
    const [value, setValue] = React.useState('one');
    const [email, setEmail] = React.useState('');
    const [messageBody, setMessageBody] = React.useState('');
    const [senderEmail, setSenderEmail] = React.useState("");
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={"pageLayout"}>
            <h2>Contact</h2>
            <div style={{display: "flex", justifyContent: "space-evenly", width: "90%", alignContent: "center", paddingTop: "5%"}}>
                <form className={"contactForm"}>
                    <Autocomplete
                        disablePortal
                        id={"usersEmails"}
                        options={users}
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
                                    label={"Your Email"} readOnly={"False"}/>

                    <InputComponent height={"80px"} type={"text"} id={"message"} value={messageBody}
                                    setValue={setMessageBody} label={"Message"} readOnly={"False"}/>
                    <button style={{height: "30px", backgroundColor: "#c5b2ec", border: "none"}} onClick={(event) => {
                        event.preventDefault()
                    }}>
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
