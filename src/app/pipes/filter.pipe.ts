import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg === '') return value;
    let resultReports = [];
    for (let report of value){
      if(report.pet.specie.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultReports.push(report);
      };

      if(report.pet.namePet.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultReports.push(report);
      };

      if(report.pet.race.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultReports.push(report);
      };

      if(report.status.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultReports.push(report);
      };
    }
    return resultReports;
  }

}
