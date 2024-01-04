import { Component, OnInit } from '@angular/core';
import { AuthService} from '../services/auth.service';
import { ArabicNumsService} from '../services/arabic-nums.service';
import { ReportsService} from '../services/reports.service';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-monthly-report',
  templateUrl: './monthly-report.component.html',
  styleUrls: ['./monthly-report.component.css']
})
export class MonthlyReportComponent implements OnInit {

  searchYear:string='';
  funeralList:any[]=[];
  
  constructor(public reportsService: ReportsService,public arabicNums: ArabicNumsService) {
    //(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
   }

  ngOnInit(): void {
  }

  getMonthlyReport(){
    this.reportsService.getMonthlyReport(this.searchYear).subscribe({
      next:(data:any)=>{
       console.log(data);
       this.funeralList=data;
      },
      error:(err:any)=>{
        console.log('http error');
        console.log(err.error);
      }
    });
  }
  search(){
    this.getMonthlyReport();
  }

  download(){
    console.log(pdfMake.vfs);
    
    const documentDefinition = {
      content: [
        'This is an example PDF generated from Angular component-rendered HTML!',
        {
          text: 'السلام عليكم',
          style: 'header'
        },
        // Add more content as needed...
      ],
      styles: {
        header: {
          fontSize: 18,
          font: 'Roboto'
        }
      }
    };
  
    pdfMake.createPdf(documentDefinition).download('example.pdf');
  }
}
