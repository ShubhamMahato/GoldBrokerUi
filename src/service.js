import Axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/crm/";
var saveCustomerData = "addcustomer";
var getCustomerData = "getcustomers";
var saveCustomerEmployee = "addemployee";
var addJob = "addjob";
class TweetService {
  saveCustomerData(
    customerId,
    customerNameData,
    customerMobileNoData,
    customerShopNameData
  ) {
    var customer = {
      customerId: customerId,
      customerName: customerNameData,
      customerMobileNo: customerMobileNoData,
      customerShopName: customerShopNameData,
    };
    return Axios.post(USER_API_BASE_URL + saveCustomerData, customer);
  }
  saveCustomerEmployeeData(
    employeeId,
    customerMobileNoData,
    employeeNameData,
    employeeMobileNumberData
  ) {
    console.log(
      "Service",
      customerMobileNoData,
      employeeNameData,
      employeeMobileNumberData
    );
    var customer = {
      employeeId: employeeId,
      customerMobileNo: customerMobileNoData,
      employeeName: employeeNameData,
      employeeMobileNumber: employeeMobileNumberData,
    };
    return Axios.post(USER_API_BASE_URL + saveCustomerEmployee, customer);
  }

  getCustomers() {
    return Axios.get(USER_API_BASE_URL + getCustomerData);
  }

  addJob(jobType, jobMaterialMachine, jobMaterialHand, customerId, employeeId, amount, hasPayed, willNoPay, willPayLater) {
    console.log("service js ", jobType, jobMaterialMachine, jobMaterialHand, customerId, employeeId, amount, hasPayed, willNoPay, willPayLater);
    var job = {
      jobType: jobType,
      jobMaterialMachine: jobMaterialMachine,
      jobMaterialHand: jobMaterialHand,
      customerId: customerId,
      customerEmployee: employeeId,
      amount: amount,
      hasPayed: hasPayed,
      willNoPay: willNoPay,
      willPayLater: willPayLater
    }
    console.log("job ", job);
    return Axios.post("http://localhost:8080/job/" + addJob, job);
  }
}

export default new TweetService();
