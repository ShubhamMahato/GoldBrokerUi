import React from "react";
import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
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
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
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
import { IconButton } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Customers() {
  const classes = useStyles();
  const [customerName, setCustomerName] = useState("");
  const [customerMobileNo, setCustomerMobileNo] = useState("");
  const [customerShopName, setCustomerShopName] = useState("");

  const [autoCompleteSelectedValue, setAutoCompleteSelectedValue] = useState(
    {}
  );

  const [customerNameError, setCustomerNameError] = useState("");
  const [customerMobileNoError, setCustomerMobileNoError] = useState("");
  const [customerShopNameError, setCustomerShopNameError] = useState("");

  const [value, setValue] = useState("");
  const [helperText, setHelperText] = useState("");

  const [showSelect, setShowSelect] = useState("none");
  const [showShopName, setShowShopName] = useState("block");
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [showSeverity, setShowSeverity] = useState("error");

  const [open, setOpen] = useState(false);

  const [openSubList, setOpenSubList] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSubListClick = (index) => {
    if (openSubList === index) {
      setOpenSubList("");
    } else {
      setOpenSubList(index);
    }
  };

  const handleAutoCompleteChange = (value) => {
    setAutoCompleteSelectedValue(value);
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
    } else {
      setShowSelect("none");
      setShowShopName("block");
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

    (async () => {
      const response = await fetch(
        "http://localhost:8080/api/crm/getcustomers"
      );
      const customers = await response.json();
      if (active) {
        if (customers) {
          setautoCompleteOptions(
            Object.keys(customers).map((key) => customers[key])
          );
        }
      }
    })();

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
  };

  const handleEmployeeEdit = (event) => {
    setModalOpen(true);
    setCustomerName("");
    setCustomerMobileNo("");
    setValue("Customer Employee");
    setShowSelect("none");
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
  };

  const onChangeCustomerName = (event) => {
    let val = event.target.value;
    val = val.replace(/[^A-z\s]/, "");
    setCustomerName(val);
  };
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
    setCustomerNameError("");
    setCustomerMobileNoError("");
    setCustomerShopNameError("");

    if (customerName === "") {
      setCustomerNameError("Customer Name can't be blank");
    }
    if (customerMobileNo === "") {
      setCustomerMobileNoError("Customer Mobile Number can't be blank");
    }
    if (customerShopName === "") {
      setCustomerShopNameError("Customer Shop Name can't be blank");
    }
    if (!validator.isMobilePhone(customerMobileNo)) {
      setCustomerMobileNoError("Please enter valid mobile number");
    }
    if (value === "") {
      setHelperText("Please select an option.");
    }

    if (
      customerNameError.trim() === "" &&
      customerMobileNoError.trim() === "" &&
      customerShopNameError.trim() === "" &&
      helperText.trim() === "" &&
      value.trim() === "Customer"
    ) {
      trackPromise(
        Service.saveCustomerData(
          customerName,
          customerMobileNo,
          customerShopName
        ).then((response) => {
          if (response.status === 200) {
            setSnackBarMessage("Saved succeffuly");
            setShowSeverity("success");
            setOpen(true);
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
      customerNameError.trim() === "" &&
      customerMobileNoError.trim() === "" &&
      helperText.trim() === "" &&
      value.trim() === "Customer Employee" &&
      autoCompleteSelectedValue !== null
    ) {
      trackPromise(
        Service.saveCustomerEmployeeData(
          autoCompleteSelectedValue.customerMobileNo,
          customerName,
          customerMobileNo
        ).then((response) => {
          if (response.status === 200) {
            setSnackBarMessage("Saved succeffuly");
            setShowSeverity("success");
            setOpen(true);
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
    (async () => {
      const response = await fetch(
        "http://localhost:8080/api/crm/getcustomersandemployees"
      );
      const customers = await response.json();
      console.log("called fetch");
      setCustomerAndEmployee(customers);
    })();
  }, [loading]);
  return (
    <Paper elevation={3} className={classes.paperGrid}>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={modalOpen}
          onClose={handleModalClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paperModal}>
              <h2 id="transition-modal-title">Transition modal</h2>
              <p id="transition-modal-description">
                react-transition-group animates me.
              </p>
            </div>
          </Fade>
        </Modal>
      </div>
      <Grid container direction="row" alignItems="center">
        <Grid item xs={6}>
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
                  Save Customer
                </Typography>
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={handleSubmit}
                >
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
                        getOptionSelected={(option, value) =>
                          option.customerName === value.customerName
                        }
                        getOptionLabel={(option) => option.customerName}
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
                            label="Asynchronous"
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
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Save Customer
                  </Button>
                </form>
              </div>
              <Box mt={8}>
                <Copyright />
              </Box>
            </Container>
          </main>
        </Grid>
        <Grid item xs={6}>
          <List
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
                        item.customer.customerName !== ""
                          ? item.customer.customerName
                          : ""
                      }
                      secondary={
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
                      })}
                    </List>
                  </Collapse>
                </List>
              );
            })}
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
}
