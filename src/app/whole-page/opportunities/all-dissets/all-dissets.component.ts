import { Component, OnInit } from '@angular/core';
import {DataControlService} from '../../../services/data-control.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {TranslateService} from '@ngx-translate/core';
import {ApiService} from '../../../api/api.service';

@Component({
  selector: 'app-all-dissets',
  templateUrl: './all-dissets.component.html',
  styleUrls: ['./all-dissets.component.css']
})
export class AllDissetsComponent implements OnInit {
  isMobile;
  isDesktop;
  isTablet;
  displayedColumns = ['index', 'universityName', 'activityPeriod', 'orderNumberAndOrder'];
  dataSource: any[];

  constructor(private http: DataControlService,
              private deviceDetectorService: DeviceDetectorService,
              private translateService: TranslateService,
              private api: ApiService) {
    this.detectDevice();
  }

  ngOnInit(): void {
    this.detectDevice();
    this.getAllDissets();
  }

  getAllDissets() {
    this.api.getAllDisSovets(this.translateService.currentLang).subscribe(
        res => {
          console.log(res);
          this.dataSource = res;
        }
    );
  }

  detectDevice() {
    this.isMobile = this.deviceDetectorService.isMobile();
    this.isTablet = this.deviceDetectorService.isTablet();
    this.isDesktop = this.deviceDetectorService.isDesktop();
  }

}
