import {
    Avatar, Box, Button, Container, CssBaseline, FormControl,
    FormHelperText, Grid, InputLabel, makeStyles, MenuItem, Paper,
    Select, Snackbar, Typography
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import React, { useState, useEffect } from 'react';
import Axios from "axios";
import AssignmentIcon from "@material-ui/icons/AssignmentIndRounded";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import StorefrontIcon from "@material-ui/icons/Storefront";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputAdornment from '@material-ui/core/InputAdornment';
import { Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Tooltip from '@material-ui/core/Tooltip';
import Service from ".././service";


const useStyles = makeStyles((theme) => ({

    paperGrid: {
        width: "100%",
        height: "100%",
    },



    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    paper: {
        padding: theme.spacing(8),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
        alignItems: "center",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    content: {
        overflow: "auto",
    },
    formControl: {
        width: "100%",
        margin: "4px"
    }

}));



export default function Addjob() {
    const [open, setOpen] = useState(false);
    const [showSeverity, setShowSeverity] = useState("error");
    const [snackBarMessage, setSnackBarMessage] = useState("");
    const [jobtype, setJobtype] = useState("");
    const [value, setValue] = useState("");
    const [listsMetalWeightsMachine, setListsMetalWeightsMachine] = useState([]);
    const [listsMetalWeightsHand, setListsMetalWeightsHand] = useState([]);
    const [jobMode, setJobMode] = useState("Machine");
    const [materialWeight, setMaterialWeight] = useState(0);

    const [showCustomerSelect, setShowCustomerSelect] = useState("none");
    const [showEmployeeSelect, setShowEmployeeSelect] = useState("none");

    const [autoCompleteOpen, setautoCompleteopen] = useState(false);
    const [autoCompleteOptions, setautoCompleteOptions] = useState([]);
    const [autoCompleteSelectedValue, setAutoCompleteSelectedValue] = useState(
        {}
    );

    const [price, setPrice] = useState(20);
    const [amount, setAmount] = useState(0);

    const [payed, setPayed] = useState(false);
    const [willPay, setWillPay] = useState(false);
    const [willNotPay, setWillNotPay] = useState(false);

    const [employeeSelect, setEmployeeSelect] = useState('');
    const [autoCompleteEmployeeOptions, setAutoCompleteEmployeeOptions] = useState([]);
    const handleAutoCompleteChange = (value) => {
        if (value !== null) {
            setAutoCompleteSelectedValue(value);
        }
    };

    const handleEmployeeSelectChange = (event) => {
        if (event.target.value !== null) {
            setEmployeeSelect(event.target.value);
        }
    };


    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        var errors = [];
        console.log("Submit", jobtype)
        if (payed === false && willPay === false && willNotPay === false) {
            errors.push("Please select payment");
        }
        if (jobtype === null || jobtype === "" || jobtype === undefined) {
            errors.push("Job type not found")
            console.log("errors 1", errors);
        }
        if (value === null || value === "" || value === undefined) {
            errors.push("Kindly select either customer or employee")
            console.log("errors 2", errors);
        }
        console.log("value ", value, ", autoCompleteSelectedValue ", autoCompleteSelectedValue, ", employeeSelect", employeeSelect,
            ", listsMetalWeightsHand", listsMetalWeightsHand, ", listsMetalWeightsMachine", listsMetalWeightsMachine);
        if (value !== null && value !== "" && value !== undefined && value === "Customer" &&
            (autoCompleteSelectedValue === null || autoCompleteSelectedValue === "" || autoCompleteSelectedValue === undefined ||
                autoCompleteSelectedValue.customerId === null || autoCompleteSelectedValue.customerId === "" ||
                autoCompleteSelectedValue.customerId === undefined)) {
            errors.push("Kindly select any customer name")
            console.log("errors 3", errors);
        }
        if (value !== null && value !== "" && value !== undefined && value === "Customer Employee") {
            if (employeeSelect === null && autoCompleteSelectedValue.customerId === null) {
                errors.push("customer and employee name should be selected");
                console.log("errors 4", errors);
            }
            else if (employeeSelect === "" && autoCompleteSelectedValue.customerId === "") {
                errors.push("customer and employee name should be selected");
                console.log("errors 5", errors);
            }
            else if (employeeSelect === undefined && autoCompleteSelectedValue.customerId === undefined) {
                errors.push("customer and employee name should be selected");
                console.log("errors 6", errors);
            }
            else if (employeeSelect === null && autoCompleteSelectedValue.customerId !== null) {
                errors.push("employee name should be selected");
                console.log("errors 7", errors);
            }
            else if (employeeSelect === "" && autoCompleteSelectedValue.customerId !== null) {
                errors.push("employee name should be selected");
                console.log("errors 8", errors);
            }
            else if (employeeSelect === "" && autoCompleteSelectedValue.customerId !== null) {
                errors.push("employee name should be selected");
                console.log("errors 9", errors);
            }
            else if (employeeSelect === undefined && autoCompleteSelectedValue.customerId !== null) {
                errors.push("employee name should be selected");
                console.log("errors 10", errors);
            }
            else if (employeeSelect !== null && autoCompleteSelectedValue.customerId === null) {
                errors.push("customer name should be selected");
                console.log("errors 11", errors);
            }
            else if (employeeSelect !== null && autoCompleteSelectedValue.customerId === "") {
                errors.push("customer name should be selected");
                console.log("errors 12", errors);
            }
            else if (employeeSelect !== null && autoCompleteSelectedValue.customerId === undefined) {
                errors.push("customer name should be selected");
                console.log("errors 13", errors);
            }
        }
        if (listsMetalWeightsMachine === null && listsMetalWeightsHand === null) {
            errors.push("Kindly add weights");
            console.log("errors 14", errors);
        }
        else if (listsMetalWeightsMachine === "" && listsMetalWeightsHand === "") {
            errors.push("Kindly add weights");
            console.log("errors 15", errors);
        }
        else if (listsMetalWeightsMachine === undefined && listsMetalWeightsHand === undefined) {
            errors.push("Kindly add weights");
            console.log("errors 16", errors);
        }
        else if (listsMetalWeightsMachine.length <= 0 && listsMetalWeightsHand.length <= 0) {
            errors.push("Kindly add weights");
            console.log("errors 17", errors);
        }
        if (errors.length > 0) {
            console.log("errors ", errors);
            setSnackBarMessage(errors);
            setShowSeverity("error");
            setOpen(true);
        }
        else {
            console.log("listsMetalWeightsMachine ", listsMetalWeightsMachine);
            console.log("listsMetalWeightsHand ", listsMetalWeightsHand);

            if (value === "Customer Employee") {
                console.log("stringMachine Employee ", listsMetalWeightsMachine, ", stringHand", listsMetalWeightsHand,
                    "customer Id ", autoCompleteSelectedValue.customerId, ", employee id", employeeSelect.employeeId)
                Service.addJob(jobtype, listsMetalWeightsMachine, listsMetalWeightsHand, autoCompleteSelectedValue.customerId,
                    employeeSelect.employeeId, 20, payed, willNotPay, willPay).then((resp) => {
                        console.log(resp);
                    })
            }
            else {
                console.log("stringMachine customer", listsMetalWeightsMachine, ", stringHand", listsMetalWeightsHand,
                    "customer Id ", autoCompleteSelectedValue.customerId, ", employee id", employeeSelect.employeeId)
                Service.addJob(jobtype, listsMetalWeightsMachine, listsMetalWeightsHand, autoCompleteSelectedValue.customerId,
                    1, 20, payed, willNotPay, willPay).then((resp) => {
                        console.log(resp);
                    })
            }
        }

    }

    const onChangeAmount = (event) => {
        setAmount(event.target.value);
    }

    const onChangePrice = (event) => {
        setPrice(event.target.value);
    }

    const handleJobMaterialChange = (event) => {
        setJobtype(event.target.value);
    };

    const handleJobModeChange = (event) => {
        setJobMode(event.target.value);
    }
    const handleAddMetalWeight = (event) => {
        if (jobMode === "Machine" && materialWeight !== "" && materialWeight !== null && materialWeight !== undefined
            && materialWeight > 0) {
            if (listsMetalWeightsMachine !== "" && listsMetalWeightsMachine !== null &&
                listsMetalWeightsMachine !== undefined && listsMetalWeightsMachine.length > 0) {
                setListsMetalWeightsMachine(listsMetalWeightsMachine => [...listsMetalWeightsMachine, materialWeight]);

            } else {
                var initialArrayMachine = [];
                initialArrayMachine.push(materialWeight);
                setListsMetalWeightsMachine(initialArrayMachine);
            }

        } else if (jobMode === "Hand" && materialWeight !== "" && materialWeight !== null
            && materialWeight !== undefined && materialWeight > 0) {
            if (listsMetalWeightsHand !== "" && listsMetalWeightsHand !== null &&
                listsMetalWeightsHand !== undefined && listsMetalWeightsHand.length > 0) {
                setListsMetalWeightsHand(listsMetalWeightsHand => [...listsMetalWeightsHand, materialWeight]);

            } else {
                var initialArrayHand = [];
                initialArrayHand.push(materialWeight);
                setListsMetalWeightsHand(initialArrayHand);
            }
        }
        setMaterialWeight(0);
    }

    const loading = autoCompleteOpen && autoCompleteOptions.length === 0;
    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        Axios.get(
            "http://localhost:8080/api/crm/getcustomers"
        ).then(response => {
            if (active) {
                if (response.data) {
                    setautoCompleteOptions(
                        Object.keys(response.data).map((key) => response.data[key])
                    );
                }
            }
        })
            .catch(err => {
                setautoCompleteOptions([]);
            })
        return () => {
            active = false;
        };

    }, [loading]);
    useEffect(() => {
        if (!autoCompleteOpen) {
            setautoCompleteOptions([]);
        }
    }, [autoCompleteOpen]);



    useEffect(() => {
        if (autoCompleteSelectedValue !== "" && autoCompleteSelectedValue !== null &&
            autoCompleteSelectedValue.customerId !== "" && autoCompleteSelectedValue.customerId !== null &&
            autoCompleteSelectedValue.customerId != null) {
            Axios.get(
                "http://localhost:8080/api/crm/getEmployeeForCustomer/" + autoCompleteSelectedValue.customerId
            ).then(response => {
                if (response.data) {
                    setAutoCompleteEmployeeOptions(
                        Object.keys(response.data).map((key) => response.data[key])
                    );
                }
            })
                .catch(err => {
                    setAutoCompleteEmployeeOptions([]);
                })
        }

    }, [autoCompleteSelectedValue]);

    const handleRadioChange = (event) => {
        setValue(event.target.value);
        if (event.target.value === "Customer") {
            setShowCustomerSelect("block");
            setShowEmployeeSelect("none");
        } else if (event.target.value === "Customer Employee") {
            setShowCustomerSelect("block");
            setShowEmployeeSelect("block");
        }
    };


    const handleRadioPaymentChange = (event) => {

        if (event.target.value === "payed") {
            setPayed(event.target.value);
            setWillPay(false);
            setWillNotPay(false);
        }
        else if (event.target.value === "will pay") {
            setWillPay(event.target.value);
            setPayed(false);
            setWillNotPay(false);
        }
        else if (event.target.value === "will not pay") {
            setWillNotPay(event.target.value);
            setPayed(false);
            setWillPay(false);
        }
    };
    const onChangeMaterialWeight = (event) => {
        if (event.target.value !== "" && event.target.value !== null && event.target.value !== undefined) {
            setMaterialWeight(Number(event.target.value));
        }
    }

    const handleListMaterialWeightMachineDelete = (index) => {
        const temp = [...listsMetalWeightsMachine];
        temp.splice(index, 1);
        setListsMetalWeightsMachine(temp);
    }

    const handleListMaterialWeightHandDelete = (index) => {
        const temp = [...listsMetalWeightsHand];
        temp.splice(index, 1);
        setListsMetalWeightsHand(temp);
    }

    const classes = useStyles();


    return (
        <Paper elevation={3} className={classes.paperGrid}>
            <Grid container style={{ overflow: 'hidden' }}>
                <Grid item sm={12} xs={12} md={5} lg={5}>
                    <main className={classes.content}>
                        <Container component="main" maxWidth="xs">
                            <CssBaseline />
                            <div className={classes.paper}>
                                <Snackbar
                                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                                    open={open}
                                    autoHideDuration={1000}
                                    onClose={handleClose}
                                    className={classes.root}
                                >

                                    <Alert onClose={handleClose} severity={showSeverity}>
                                        {snackBarMessage}
                                    </Alert>
                                </Snackbar>
                                <Avatar className={classes.avatar}>
                                    <AssignmentIcon />
                                </Avatar>

                                <Typography component="h1" variant="h5">
                                    Add Job
                                </Typography>
                                <Box sx={{ minWidth: 120 }}>
                                    <form
                                        className={classes.form}
                                        noValidate
                                        onSubmit={handleSubmit}
                                    >

                                        <FormControl className={classes.formControl} sx={{ m: 1, minWidth: 120 }}>
                                            <InputLabel id="demo-simple-select-helper-label">Job Type</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-helper-label"
                                                id="demo-simple-select-helper"
                                                value={jobtype}
                                                label="Age"
                                                onChange={handleJobMaterialChange}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={"Gold"}>Gold</MenuItem>
                                                <MenuItem value={"Silver"}>Silver</MenuItem>
                                            </Select>
                                            <FormHelperText>Select job type either Gold or Silver</FormHelperText>
                                        </FormControl>
                                        <RadioGroup
                                            className={classes.formControl}
                                            aria-label="quiz"
                                            name="Customer Type"
                                            row
                                            value={value}
                                            onChange={handleRadioChange}
                                        >
                                            <FormControlLabel
                                                value="Customer"
                                                control={<Radio />}
                                                label="Customer"
                                            />
                                            <FormControlLabel
                                                value="Customer Employee"
                                                control={<Radio />}
                                                label="Employee"
                                            />
                                        </RadioGroup>
                                        <Box component="div" display={showCustomerSelect}>
                                            <FormControl className={classes.formControl}>
                                                <Autocomplete
                                                    id="asynchronous"
                                                    onChange={(event, value) =>
                                                        handleAutoCompleteChange(value)
                                                    }
                                                    open={autoCompleteOpen}
                                                    onOpen={() => {
                                                        setautoCompleteopen(true);
                                                    }}
                                                    onClose={() => {
                                                        setautoCompleteopen(false);
                                                    }}
                                                    getOptionSelected={(option, value) => {
                                                        if (value === "") {
                                                            return true;
                                                        } else if (option.customerName === value.customerName) {
                                                            return true;
                                                        }
                                                    }
                                                    }
                                                    getOptionLabel={(option) => option.customerName ? option.customerName : ''}
                                                    options={autoCompleteOptions}
                                                    loading={loading}
                                                    renderOption={(option) => {
                                                        return (
                                                            <Grid item container>
                                                                <Grid item xs={2}>
                                                                    <AccountBoxIcon />
                                                                </Grid>
                                                                <Grid item xs={10}>
                                                                    {option.customerName}
                                                                </Grid>
                                                                <Grid item xs={2}>
                                                                    <StorefrontIcon />
                                                                </Grid>
                                                                <Grid item xs={10}>
                                                                    {option.customerShopName}
                                                                </Grid>
                                                            </Grid>
                                                        );
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Select Customer"
                                                            variant="outlined"
                                                            InputProps={{
                                                                ...params.InputProps,
                                                                endAdornment: (
                                                                    <React.Fragment>
                                                                        {loading ? (
                                                                            <CircularProgress
                                                                                color="inherit"
                                                                                size={20}
                                                                            />
                                                                        ) : null}
                                                                        {params.InputProps.endAdornment}
                                                                    </React.Fragment>
                                                                ),
                                                            }}
                                                        />
                                                    )}
                                                />
                                            </FormControl>
                                        </Box>
                                        {autoCompleteEmployeeOptions !== "" && autoCompleteEmployeeOptions !== null &&
                                            autoCompleteEmployeeOptions.length > 0 && autoCompleteEmployeeOptions[0].employeeId !== ""
                                            && autoCompleteEmployeeOptions[0].employeeId !== null && autoCompleteEmployeeOptions[0].employeeId !== undefined
                                            ?
                                            < Box display={showEmployeeSelect}>
                                                <FormControl className={classes.formControl} sx={{ m: 1, minWidth: 120 }}>
                                                    <InputLabel id="demo-simple-select-helper-label">Employee</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-helper-label"
                                                        id="demo-simple-select-helper"
                                                        value={employeeSelect}
                                                        label="Select Customer Employee"
                                                        defaultValue=""
                                                        onChange={handleEmployeeSelectChange}
                                                    >
                                                        <MenuItem value="">
                                                            <em>None</em>
                                                        </MenuItem>
                                                        {autoCompleteEmployeeOptions.map((emp) => (
                                                            <MenuItem key={emp.employeeId} value={emp.employeeId}>{emp.employeeName}</MenuItem>
                                                        ))}
                                                    </Select>
                                                    <FormHelperText>Select the Customer's Employee</FormHelperText>
                                                </FormControl>

                                            </Box>
                                            : ""}
                                        <Grid container >
                                            <Grid item sm={10} xs={10} md={10} lg={10}>
                                                <TextField
                                                    variant="outlined"
                                                    margin="normal"
                                                    required
                                                    name="weight"
                                                    label="Metal"
                                                    type="number"
                                                    id="weight"
                                                    autoComplete="off"
                                                    value={materialWeight}
                                                    onChange={onChangeMaterialWeight}

                                                    InputProps={{
                                                        startAdornment:
                                                            <InputAdornment position="start">
                                                                <Select
                                                                    labelId="demo-simple-select-helper-label"
                                                                    id="demo-simple-select-helper"
                                                                    value={jobMode}
                                                                    label="Age"
                                                                    onChange={handleJobModeChange}
                                                                >
                                                                    <MenuItem value={"Machine"}>M</MenuItem>
                                                                    <MenuItem value={"Hand"}>H</MenuItem>
                                                                </Select>
                                                            </InputAdornment>,
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item sm={2} xs={2} md={2} lg={2} >
                                                <Fab size="small" color="primary" aria-label="add">
                                                    <AddIcon onClick={handleAddMetalWeight} />
                                                </Fab>
                                            </Grid>

                                        </Grid>
                                        <Grid container>
                                            <Tooltip title="Payed">
                                                <Grid item sm={12} xs={12} md={4} lg={4}>
                                                    <RadioGroup
                                                        aria-label="quiz"
                                                        name="Payment"
                                                        value={payed}
                                                        row
                                                        onChange={handleRadioPaymentChange}
                                                    >
                                                        <FormControlLabel
                                                            value="payed"
                                                            control={<Radio />}
                                                            label="P"
                                                        />

                                                    </RadioGroup>
                                                </Grid>
                                            </Tooltip>
                                            <Tooltip title="Will Pay Later">
                                                <Grid item sm={12} xs={12} md={4} lg={4}>
                                                    <RadioGroup
                                                        aria-label="quiz"
                                                        name="Payment"
                                                        value={willPay}
                                                        row
                                                        onChange={handleRadioPaymentChange}
                                                    >
                                                        <FormControlLabel
                                                            value="will pay"
                                                            control={<Radio />}
                                                            label="W"
                                                        />

                                                    </RadioGroup>
                                                </Grid>
                                            </Tooltip>
                                            <Tooltip title="Will Not Later">
                                                <Grid item sm={12} xs={12} md={4} lg={4}>
                                                    <RadioGroup
                                                        aria-label="quiz"
                                                        name="Payment"
                                                        value={willNotPay}
                                                        row
                                                        onChange={handleRadioPaymentChange}
                                                    >
                                                        <FormControlLabel
                                                            value="will not pay"
                                                            control={<Radio />}
                                                            label="N"
                                                        />
                                                    </RadioGroup>
                                                </Grid>
                                            </Tooltip>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className={classes.submit}
                                        >
                                            Save Job
                                        </Button>
                                        <Grid container>
                                            <Grid item sm={12} xs={12} md={6} lg={6}>
                                                {(listsMetalWeightsMachine !== "" && listsMetalWeightsMachine !== null && listsMetalWeightsMachine !== undefined &&
                                                    listsMetalWeightsMachine.length > 0) ?

                                                    <List subheader={<ListSubheader style={{ textAlign: "left" }}>Machine Tunch</ListSubheader>}>
                                                        {listsMetalWeightsMachine.map((value, index) => (
                                                            <ListItem
                                                                key={index}

                                                            >
                                                                <ListItemText primary={`(${index + 1}) ${value} gm`} />
                                                                <ListItemIcon onClick={() => handleListMaterialWeightMachineDelete(index)}>
                                                                    <DeleteOutlinedIcon />
                                                                </ListItemIcon>
                                                            </ListItem>
                                                        ))}
                                                    </List> :
                                                    <p>No Item for Machine</p>
                                                }
                                            </Grid>
                                            <Grid item sm={12} xs={12} md={6} lg={6}>
                                                {(listsMetalWeightsHand !== "" && listsMetalWeightsHand !== null && listsMetalWeightsHand !== undefined
                                                    && listsMetalWeightsHand.length > 0) ?

                                                    <List subheader={<ListSubheader style={{ textAlign: "left" }}>Hand Tunch</ListSubheader>}>
                                                        {listsMetalWeightsHand.map((value, index) => (
                                                            <ListItem
                                                                key={index}
                                                            >
                                                                <ListItemText primary={`(${index + 1}) ${value} gm`} />
                                                                <ListItemIcon style={{ alignContent: "right" }}>
                                                                    <DeleteOutlinedIcon onClick={() => handleListMaterialWeightHandDelete(index)} />
                                                                </ListItemIcon>
                                                            </ListItem>
                                                        ))}
                                                    </List> :
                                                    <p>No Item For Hand</p>
                                                }
                                            </Grid>
                                        </Grid>


                                    </form>
                                </Box>
                            </div>
                        </Container>
                    </main>
                </Grid>
            </Grid >

        </Paper >);
}



//     private Long jobId;

//     private String jobType;

//     private String jobMaterial;

//     private List<String> jobWeight;

//     private Long customerId;

//     private Long customerEmployee;

//     private Long amount;

//     private boolean paidAmount;

//     private boolean willNoPay;

//     private String errorCode;

