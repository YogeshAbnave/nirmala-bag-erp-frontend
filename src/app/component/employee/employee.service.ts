import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  getEmployees() {
    return Promise.resolve([
        {
          id: '1002',
          fisrtName: 'Abhijeet',
          middleName: 'Bapu',
          lastName: 'Raut',
          contactNummer: '123456789',
          EmergencyContactNummer: '123456789',
          address: 'lorem',
          permenantAddress: 'lorem',
          experienceBagManufacturingDetails: 'Lorem',
          experienceSewingMachineDetails: 'Lorem',
          status: 'Probation',
          joiningDate: '20/20/2020',
          skillSet: 'Helper',
          designation: 'Helper'
        },


    ]);
}


}
