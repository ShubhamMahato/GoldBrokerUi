import React from "react";
import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AssignmentIcon from "@material-ui/icons/AssignmentIndRounded";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import validator from "validator";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Service from "../../service";
import Axios from "axios";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { trackPromise } from "react-promise-tracker";
import Autocomplete from "@material-ui/lab/Autocomplete";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import CircularProgress from "@material-ui/core/CircularProgress";
import StorefrontIcon from "@material-ui/icons/Storefront";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import EditIcon from "@material-ui/icons/Edit";
import { Fab, IconButton } from "@material-ui/core";
const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200,
    },
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  formControl: {
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(8),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    alignItems: "center",
  },
  fixedHeight: {
    height: 240,
  },
  accordian: {
    marginTop: theme.spacing(14)
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    overflow: "hidden",
    height: "100%"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  helpError: {
    color: "red",
  },
  paperGrid: {
    width: "100%",
    height: "100%",
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  edit: {
    paddingRight: theme.spacing(4),
  },
  listroot: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },

  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function Customers() {
  const classes = useStyles();
  const [customerName, setCustomerName] = useState("");
  const [customerMobileNo, setCustomerMobileNo] = useState("");
  const [customerShopName, setCustomerShopName] = useState("");
  const [loadingFormSubmit, setLoadingFormSubmit] = useState(false);
  const [isDisabledSaveButton, setIsDisabledSaveButton] = useState(false);

  const [autoCompleteSelectedValue, setAutoCompleteSelectedValue] = useState(
    {}
  );

  const [customerNameError, setCustomerNameError] = useState("");
  const [customerMobileNoError, setCustomerMobileNoError] = useState("");
  const [customerShopNameError, setCustomerShopNameError] = useState("");
  var [addedCustomer, setAddedCustomer] = useState(0);

  const [value, setValue] = useState("");
  const [helperText, setHelperText] = useState("");

  const [showSelect, setShowSelect] = useState("none");
  const [showShopName, setShowShopName] = useState("block");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [showSeverity, setShowSeverity] = useState("error");
  const [saveButtonValue, setSaveButtonValue] = useState("Customer");
  const [id, setId] = useState("");
  const [showId, setShowId] = useState("none");

  const [open, setOpen] = useState(false);

  const [openSubList, setOpenSubList] = useState(true);

  const handleSubListClick = (index) => {
    if (openSubList === index) {
      setOpenSubList("");
    } else {
      setOpenSubList(index);
    }
  };

  const handleAutoCompleteChange = (value) => {
    if (value !== null) {
      setAutoCompleteSelectedValue(value);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    if (event.target.value === "Customer Employee") {
      setShowSelect("block");
      setShowShopName("none");
      setSaveButtonValue("Employee")
    } else {
      setShowSelect("none");
      setShowShopName("block");
      setSaveButtonValue("Customer")
    }
    setHelperText("");
  };

  const [autoCompleteOpen, setautoCompleteopen] = useState(false);
  const [autoCompleteOptions, setautoCompleteOptions] = useState([]);
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

  const handleCustomerEdit = (event) => {
    setCustomerName("");
    setCustomerShopName("");
    setCustomerMobileNo("");
    setValue("Customer");
    setShowSelect("block");
    setCustomerName(
      event.customerName && event.customerName !== "" ? event.customerName : ""
    );
    setCustomerShopName(
      event.customerShopName && event.customerShopName !== ""
        ? event.customerShopName
        : ""
    );
    setCustomerMobileNo(
      event.customerMobileNo && event.customerMobileNo !== ""
        ? event.customerMobileNo
        : ""
    );
    setValue("Customer");
    setShowSelect("none");
    setShowShopName("block");
    setSaveButtonValue("Customer")
    setId(event.customerId && event.customerId !== "" ? event.customerId : "");
    setShowId("block");
  };

  const handleEmployeeEdit = (event) => {
    setCustomerName("");
    setCustomerMobileNo("");
    setValue("Customer Employee");
    setCustomerName(
      event.employeeName && event.employeeName !== "" ? event.employeeName : ""
    );
    setCustomerMobileNo(
      event.employeeMobileNumber && event.employeeMobileNumber !== ""
        ? event.employeeMobileNumber
        : ""
    );
    setValue("Customer Employee");
    setShowSelect("none");
    setShowShopName("none");
    setSaveButtonValue("Employee")
    setId(event.employeeId && event.employeeId !== "" ? event.employeeId : "");
    setShowId("block")
  };

  const onChangeCustomerName = (event) => {
    let val = event.target.value;
    val = val.replace(/[^A-z\s]/, "");
    setCustomerName(val);
  };
  const handleReset = () => {
    setCustomerName("");
    setCustomerMobileNo("");
    setValue("");
    setShowSelect("none");
    setShowShopName("none");
    setSaveButtonValue("Employee")
    setId("");
    setShowId("none");
  }
  const onCustomerMobileNo = (event) => {
    const value = event.target.value.replace(/\D/g, "");
    setCustomerMobileNo(value);
  };
  const onCustomerShopName = (event) => {
    let val = event.target.value;
    val = val.replace(/[^A-z\s]/, "");
    setCustomerShopName(val);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoadingFormSubmit(true);
    setIsDisabledSaveButton(true);
    setCustomerNameError("");
    setCustomerMobileNoError("");
    setCustomerShopNameError("");

    if (customerName.trim() === "" || customerName.trim() === null) {
      setCustomerNameError("Customer Name can't be blank");
    }
    if (customerMobileNo.trim() === "" || customerMobileNo.trim() === null) {
      setCustomerMobileNoError("Customer Mobile Number can't be blank");
    }
    if (customerShopName.trim() === "" || customerShopName.trim() === null) {
      setCustomerShopNameError("Customer Shop Name can't be blank");
    }
    if (!validator.isMobilePhone(customerMobileNo) || customerMobileNo === "" || customerMobileNo.length < 10) {
      setCustomerMobileNoError("Please enter valid mobile number");
    }
    if (value.trim() === "") {
      setHelperText("Please select an option.");
    }
    console.log("valid phn no", validator.isMobilePhone(customerMobileNo));

    if (
      customerName.trim() !== "" && customerName.trim() !== null &&
      customerMobileNo.trim() !== "" && customerMobileNo.trim() !== null && customerMobileNo.length === 10 &&
      customerShopName.trim() !== "" && customerShopName.trim() !== null &&
      helperText === "" &&
      value === "Customer"
    ) {
      trackPromise(
        Service.saveCustomerData(
          id,
          customerName,
          customerMobileNo,
          customerShopName
        ).then((response) => {
          console.log(response);
          if (response.status === 200) {
            setSnackBarMessage("Saved succeffuly");
            setShowSeverity("success");
            setOpen(true);
            setAddedCustomer(addedCustomer = addedCustomer + 1);
            console.log("added custmer");
            console.log(addedCustomer);
          }
        })
      ).catch((err) => {
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.errorCode !== ""
        ) {
          setSnackBarMessage(err.response.data.errorCode);
          setShowSeverity("error");
          setOpen(true);
        } else {
          setSnackBarMessage("Some error occured");
          setShowSeverity("error");
          setOpen(true);
        }
      });
    } else if (
      customerName.trim() !== "" && customerName.trim() !== null &&
      customerMobileNo.trim() !== "" && customerMobileNo.trim() !== null && customerMobileNo.length === 10 &&
      helperText.trim() === "" &&
      value.trim() === "Customer Employee" &&
      autoCompleteSelectedValue !== null
    ) {
      trackPromise(
        Service.saveCustomerEmployeeData(
          id,
          autoCompleteSelectedValue.customerMobileNo,
          customerName,
          customerMobileNo
        ).then((response) => {
          if (response.status === 200) {
            setSnackBarMessage("Saved succeffuly");
            setShowSeverity("success");
            setOpen(true);
            setAddedCustomer(addedCustomer = addedCustomer + 1);
            console.log("added custmer");
            console.log(addedCustomer);
          }
        })
      ).catch((err) => {
        console.log(err);
        if (
          err &&
          err.response &&
          err.response.data &&
          err.response.data.errorCode
        ) {
          setSnackBarMessage(err.response.data.errorCode);
          setShowSeverity("error");
          setOpen(true);
        } else {
          setSnackBarMessage("Some error occured");
          setShowSeverity("error");
          setOpen(true);
        }
      });
    } else {
    }
    setLoadingFormSubmit(false);
    setIsDisabledSaveButton(false);
  };

  const [customerAndEmployee, setCustomerAndEmployee] = useState([]);

  const customerObject = {
    customerName: "",
    customerMobileNo: "",
    customerShopName: "",
  };

  const employeeObject = {
    employeeName: "",
    employeeMobileNumber: "",
  };

  useEffect(() => {
    Axios.get(
      "http://localhost:8080/api/crm/getcustomersandemployees"
    ).then(response => {
      console.log("called fetch", addedCustomer, response.data);
      setCustomerAndEmployee(response.data);
    })
      .catch(err => {
        setCustomerAndEmployee("");
      })

  }, [addedCustomer]);
  return (
    <Paper elevation={3} className={classes.paperGrid}>

      <Grid container>
        <Grid item sm={12} xs={12} md={6} lg={6}>
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
                  Save Customer &nbsp;
                  <Fab size="small" color="secondary" variant="extended" onClick={handleReset}>
                    Reset
                  </Fab>
                </Typography>
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={handleSubmit}
                >
                  <Box component="div" display={showId}>
                    <TextField
                      disabled
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="id"
                      label="id"
                      name="id"
                      value={id}
                      autoComplete="off"
                      autoFocus
                    />
                  </Box>
                  <TextField
                    error={customerNameError.length === 0 ? false : true}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="customerName"
                    label="Customer Name"
                    name="Name"
                    value={customerName}
                    helperText={customerNameError}
                    onChange={onChangeCustomerName}
                    autoComplete="off"
                    autoFocus
                  />
                  <TextField
                    error={customerMobileNoError.length === 0 ? false : true}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="customerMobileNo"
                    label="Customer Mobile Number"
                    type="text"
                    id="mobile"
                    autoComplete="off"
                    helperText={customerMobileNoError}
                    value={customerMobileNo}
                    onChange={onCustomerMobileNo}
                  />
                  <Box component="div" display={showShopName}>
                    <TextField
                      error={customerShopNameError.length === 0 ? false : true}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="customerShopName"
                      label="Customer Shop Name"
                      type="text"
                      id="shopName"
                      autoComplete="off"
                      helperText={customerShopNameError}
                      value={customerShopName}
                      onChange={onCustomerShopName}
                    />
                  </Box>
                  <RadioGroup
                    aria-label="quiz"
                    name="Customer Type"
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
                      label="Customer Employee"
                    />
                  </RadioGroup>
                  <FormHelperText className={classes.helpError}>
                    {helperText}
                  </FormHelperText>
                  <Box component="div" display={showSelect}>
                    <FormControl className={classes.formControl}>
                      <Autocomplete
                        id="asynchronous-demo"
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
                      <FormHelperText>Select the customer</FormHelperText>
                    </FormControl>
                  </Box>
                  {loadingFormSubmit && (
                    <CircularProgress
                      size={68}
                    />
                  )}

                  <Button
                    type="submit"
                    disabled={isDisabledSaveButton}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Save {saveButtonValue}
                  </Button>
                </form>
              </div>
            </Container>
          </main>
        </Grid>
        <Grid item sm={12} xs={12} md={6} lg={6}>
          {customerAndEmployee && customerAndEmployee.length > 0 &&
            customerAndEmployee[0] !== null && customerAndEmployee[0].errorCode === null ?
            <List
              className={classes.accordian}
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  Customers And Employees
                </ListSubheader>
              }
            >
              {customerAndEmployee.map((item, index) => {
                return (

                  <List key={index}>
                    <ListItem
                      key={index}
                      button
                      onClick={() => {
                        handleSubListClick(index);
                      }}
                    >
                      <ListItemIcon>
                        <AccountBoxIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          item && item.customer && item.customer.customerName &&
                            item.customer.customerName !== ""
                            ? item.customer.customerName
                            : ""
                        }
                        secondary={
                          item && item.customer && item.customer.customerShopName &&
                            item.customer.customerShopName !== ""
                            ? item.customer.customerShopName
                            : ""
                        }
                      />
                      <ListItemIcon>
                        <IconButton
                          aria-label="comments"
                          onClick={() => {
                            handleCustomerEdit(
                              item.customer !== ""
                                ? item.customer
                                : customerObject
                            );
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                      </ListItemIcon>
                      {index === openSubList ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse
                      className={classes.nested}
                      in={index === openSubList}
                      timeout="auto"
                      unmountOnExit
                    >
                      {item && item.customersEmployeeList && item.customersEmployeeList.length > 0 ?
                        <List component="div" disablePadding>
                          {item.customersEmployeeList.map((sub, subIndex) => {
                            return (
                              <ListItem
                                className={classes.nested}
                                key={subIndex}
                                button
                              >
                                <ListItemIcon>
                                  <StarBorder />
                                </ListItemIcon>
                                <ListItemText
                                  primary={
                                    sub && sub.employeeName ? (
                                      sub.employeeName
                                    ) : (
                                      <p>No Employee</p>
                                    )
                                  }
                                />
                                <ListItemIcon>
                                  <IconButton
                                    onClick={() => {
                                      handleEmployeeEdit(
                                        sub !== "" ? sub : employeeObject
                                      );
                                    }}
                                    edge="start"
                                    aria-label="comments"
                                  >
                                    <EditIcon />
                                  </IconButton>
                                </ListItemIcon>
                              </ListItem>
                            );
                          }
                          )
                          }
                        </List>
                        : <p>No Employee</p>
                      }
                    </Collapse>
                  </List>
                );
              })}
            </List>
            : <p>No Customers</p>}
        </Grid>
      </Grid>
    </Paper >
  );
}
