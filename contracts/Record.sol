// SPDX-License-Identifier: UNLICENSED


pragma solidity >0.7.0 <= 0.9.0;


import "hardhat/console.sol";
contract HealthDetails {
    
    struct Patient{
        string p_id;
        string p_name;
        string p_homeaddr;
        string p_sex;
        string p_phone;
        string p_birthDate;
        string p_ht;
        string p_wt;
        string p_bloodgroup;
        address p_addr;
        uint p_date;
    }

    struct Doctor{
        string d_id;
        string d_name;
        string d_sex;
        string d_phone;
        string d_birthDate;
        string d_qualification;
        address d_addr;
        uint d_date;
    }

    address public owner;

    constructor()  {
        owner = msg.sender;
    }

    address[] public p_List;
    address[] public d_List;
    
    mapping(address => Patient) patients;
    mapping(address => Doctor) doctors;

    mapping(address=>mapping(address=>bool)) isAllowed;
    mapping(address => bool) isPatient;
    mapping(address => bool) isDoctor;

    uint256 public p_Cnt = 0;
    uint256 public d_Cnt = 0;
    uint256 public perm_Granted_Cnt = 0;

    // populates the details of new patients.
    function setPatient(string memory _p_id, string memory _p_name, string memory _p_homeaddr, string memory _p_sex, string memory _p_phone , string memory _p_birthDate, string memory _p_ht, string memory _p_wt, string memory _p_bloodgroup) public {
        require(!isPatient[msg.sender]);
        Patient memory pt;
        
        pt.p_id = _p_id;
        pt.p_name = _p_name;
        pt.p_homeaddr = _p_homeaddr;
        pt.p_sex = _p_sex;
        pt.p_phone = _p_phone;
        pt.p_birthDate = _p_birthDate;
        pt.p_ht = _p_ht; 
        pt.p_wt = _p_wt;
        pt.p_bloodgroup = _p_bloodgroup;
        pt.p_addr = msg.sender;
        pt.p_date = block.timestamp;
        p_List.push(msg.sender);
        isPatient[msg.sender] = true;
        isAllowed[msg.sender][msg.sender] = true;
        p_Cnt++;
        
        patients[msg.sender] = pt;
    }
    
    // edit the details of existing patients.
    function editPatient(string memory _p_id, string memory _p_name, string memory _p_homeaddr, string memory _p_sex, string memory _p_phone , string memory _p_birthDate, string memory _p_ht, string memory _p_wt, string memory _p_bloodgroup) public  {
        require(isPatient[msg.sender]);
        Patient memory pt = patients[msg.sender];
        pt.p_id = _p_id;
        pt.p_name = _p_name;
        pt.p_homeaddr = _p_homeaddr;
        pt.p_sex = _p_sex;
        pt.p_phone = _p_phone;
        pt.p_birthDate = _p_birthDate;
        pt.p_ht = _p_ht; 
        pt.p_wt = _p_wt;
        pt.p_bloodgroup = _p_bloodgroup;
        pt.p_addr = msg.sender;  
        patients[msg.sender] = pt;
    }

    // populates the details of new doctors.
    function setDoctor(string memory _d_id, string memory _d_name, string memory _d_sex, string memory _d_phone, string memory _d_birthDate, string memory _d_qualification) public  {
        require(!isDoctor[msg.sender]);
        Doctor memory dr;
        
        dr.d_id = _d_id;
        dr.d_name = _d_name;
        dr.d_sex = _d_sex;
        dr.d_phone = _d_phone;
        dr.d_birthDate = _d_birthDate;
        dr.d_qualification = _d_qualification;
        dr.d_addr = msg.sender;
        dr.d_date = block.timestamp;
        
        d_List.push(msg.sender);
        isDoctor[msg.sender] = true;
        d_Cnt++;
        doctors[msg.sender] = dr;
    }

    //Allows doctors to edit their existing profile
    function editDoctor(string memory _d_id, string memory _d_name, string memory _d_sex, string memory _d_phone, string memory _d_birthDate, string memory _d_qualification) public  {
        require(isDoctor[msg.sender]);
        Doctor memory dr = doctors[msg.sender];
        
        dr.d_id = _d_id;
        dr.d_name = _d_name;
        dr.d_sex = _d_sex;
        dr.d_phone = _d_phone;
        dr.d_birthDate = _d_birthDate;
        dr.d_qualification = _d_qualification;
        dr.d_addr = msg.sender;
        doctors[msg.sender] = dr;
    }

    //Only the owner of the record has the authority to grant permission for doctors to access and view the records.
    function grant_Access(address _address) public returns(bool x) {

        perm_Granted_Cnt++;
        isAllowed[msg.sender][_address] = true;
        return true;

    }

    //The owner of the record has the capability to revoke the permission previously granted to doctors for accessing and viewing records.
    function revoke_Access(address _address) public returns(bool x) {

        // if (perm_Granted_Cnt > 0)
        // {
        //     perm_Granted_Cnt--;
        // }
        isAllowed[msg.sender][_address] = false;
        return true;

    }

    //Fetch a roster of addresses for all patients.
    function showPatientsList() public view returns(address[] memory) {
        return p_List;
    }

    //Fetch a roster of addresses for all doctors.
    function showDoctorsList() public view returns(address[] memory) {
        return d_List;
    }

    
    //Retrieve patient information by entering a patient's address (Access is restricted to the record owner or a doctor with permission)
    function findPatient(address _address) public view returns(string memory s1, string memory s2, string memory s3, string memory s4, string memory s5, string memory s6, string memory s7,string memory s8, string memory s9) {
        require(isAllowed[_address][msg.sender]);
        
        Patient memory pt = patients[_address];
        // console.log("lll");
        // console.log(pt.p_name);
        // console.log(" id %s", pt.p_id);
        //console.log(" %s,name:%s,%s,%s,%s,%s,%s,%s,%s",pt.p_id, pt.p_name, pt.p_homeaddr, pt.p_sex, pt.p_phone,pt.p_birthDate, pt.p_ht, pt.p_wt, pt.p_bloodgroup );
        return (pt.p_id, pt.p_name, pt.p_homeaddr, pt.p_sex, pt.p_phone,pt.p_birthDate, pt.p_ht, pt.p_wt, pt.p_bloodgroup );
  
    }
 

    //Retrieve information about a doctor by entering the doctor's address (Access is restricted to the doctor only).
    function findDoctor(address _address) public view returns(string memory, string memory, string memory, string memory, string memory, string memory) {
        require(isDoctor[_address]);
        
        Doctor memory dr = doctors[_address];
        
        return (dr.d_id, dr.d_name, dr.d_sex, dr.d_phone, dr.d_birthDate, dr.d_qualification);
    }

    // function findPatient() public view returns(uint) {
        
    //     return (pt.p_date);
    // }
    

    //Retrieve the creation date of a patient record by entering the patient's address.
    function findPatientRecordDate(address _address) public view returns(uint) {
        Patient memory pt = patients[_address];
        
        return (pt.p_date);
    }

    //Retrieve the creation date of a doctor record by entering the doctor's address.
    function findDoctorRecordDate(address _address) public view returns(uint) {
        Doctor memory dr = doctors[_address];
        
        return (dr.d_date);
    }


    // patient count
    function no_of_Patients() public view returns(uint256) {
        return p_Cnt;
    }

    //doctor count
    function no_of_Doctors() public view returns(uint256) {
        return d_Cnt;
    }

    //permission granted count
    function no_of_Perm_Granted() public view returns(uint256) {
        return perm_Granted_Cnt;
    }

}









