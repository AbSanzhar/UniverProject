import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../../api/api.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {LanguageService} from '../../../services/language.service';

@Component({
    selector: 'app-all-science-projects',
    templateUrl: './all-science-projects.component.html',
    styleUrls: ['./all-science-projects.component.css']
})
export class AllScienceProjectsComponent implements OnInit {
    isMobile;
    isDesktop;
    isTablet;

    // tslint:disable-next-line:variable-name
    constructor(
        private _api: ApiService,
        private deviceDetectorService: DeviceDetectorService,
        private languageService: LanguageService) {
        this.detectDevice();
    }

    dataSource: any[];
    allScienceProjecrs: any[] = [];
    displayedColumns5 = ['id', 'name', 'type', 'priority', 'subPriority', 'subSubPriority', 'executor', 'customer', 'dirFullName', 'dept', 'agrDate', 'registerNumber', 'startDate', 'endDate', 'totalSum'];
    language;

    ngOnInit(): void {
        this.languageService.currentLanguage.subscribe(lang => {

            console.log(lang);
            this.language = lang;
            this.getAllScienceProjects(lang);
        });
        this.detectDevice();
        this.getAllScienceProjects(this.language);
    }

    // scAgrDate: "2020-06-23T00:00:00.000+0000"
    // scCustomer: "test"
    // scDept: "Information Systems"
    // scEndDate: "2020-07-12T00:00:00.000+0000"
    // scExecutor: "test"
    // scFirstName: "Admin Adminov"
    // scId: 10
    // scName: "test"
    // scNum: "1"
    // scPriority: "Энергетика и машиностроение"
    // scStDate: "2020-06-27T00:00:00.000+0000"

    getAllScienceProjects(lang) {
        this._api.getAllScienceProjects(lang).subscribe(
            res => {
                this.dataSource = res;
                // console.log(res);
                this.allScienceProjecrs = res;
                for (let i = 0; i < res.length; i++) {
                    const agrDay = new Date(res[i].scAgrDate).getDate() < 10 ? '0'
                        + new Date(res[i].scAgrDate).getDate() : new Date(res[i].scAgrDate).getDate();
                    const agrMonth = (new Date(res[i].scAgrDate).getMonth()
                        + 1) < 10 ? '0'
                        + (new Date(res[i].scAgrDate).getMonth()
                            + 1) : (new Date(res[i].scAgrDate).getMonth() + 1);
                    const agrYear = new Date(res[i].scAgrDate).getFullYear();
                    this.allScienceProjecrs[i].scAgrDate = agrDay + '/' + agrMonth + '/' + agrYear;

                    const stDay = new Date(res[i].scStDate).getDate() < 10 ? '0'
                        + new Date(res[i].scStDate).getDate() : new Date(res[i].scStDate).getDate();
                    const stMonth = (new Date(res[i].scStDate).getMonth()
                        + 1) < 10 ? '0' + (new Date(res[i].scStDate).getMonth()
                        + 1) : (new Date(res[i].scStDate).getMonth() + 1);
                    const stYear = new Date(res[i].scStDate).getFullYear();
                    this.allScienceProjecrs[i].scStDate = stDay + '/' + stMonth + '/' + stYear;

                    const endDay = new Date(res[i].scEndDate).getDate() < 10 ? '0'
                        + new Date(res[i].scEndDate).getDate() : new Date(res[i].scEndDate).getDate();
                    const endMonth = (new Date(res[i].scEndDate).getMonth()
                        + 1) < 10 ? '0' + (new Date(res[i].scEndDate).getMonth()
                        + 1) : (new Date(res[i].scEndDate).getMonth() + 1);
                    const endYear = new Date(res[i].scEndDate).getFullYear();
                    this.allScienceProjecrs[i].scEndDate = endDay + '/' + endMonth + '/' + endYear;
                }
            }, err => {
                console.log(err);
            }
        );
    }

    detectDevice() {
        this.isMobile = this.deviceDetectorService.isMobile();
        this.isTablet = this.deviceDetectorService.isTablet();
        this.isDesktop = this.deviceDetectorService.isDesktop();
    }

}
