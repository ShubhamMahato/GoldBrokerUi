import Axios from "axios";

const USER_API_BASE_URL = "http://localhost:8080/api/crm/";
var saveCustomerData = "addcustomer";
var getCustomerData = "getcustomers";
var saveCustomerEmployee = "addemployee";
class TweetService {
  saveCustomerData(
    customerNameData,
    customerMobileNoData,
    customerShopNameData
  ) {
    var customer = {
      customerName: customerNameData,
      customerMobileNo: customerMobileNoData,
      customerShopName: customerShopNameData,
    };
    return Axios.post(USER_API_BASE_URL + saveCustomerData, customer);
  }
  saveCustomerEmployeeData(
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
      customerMobileNo: customerMobileNoData,
      employeeName: employeeNameData,
      employeeMobileNumber: employeeMobileNumberData,
    };
    return Axios.post(USER_API_BASE_URL + saveCustomerEmployee, customer);
  }

  getCustomers() {
    return Axios.get(USER_API_BASE_URL + getCustomerData);
  }
}

export default new TweetService();
