import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { delay, Observable, of } from "rxjs";

const ALTER_EGOS = ['Eric'];

@Injectable()
export class ListService {
    url: string = 'https://localhost:5001/api/Lists/';
    constructor(private http: HttpClient){}

    InListSex(name: string): Observable<object>{
        return this.http.post(this.url+`getInListSex`,{ str: name});
    };

    InListRegion(name: string): Observable<object>{
        return this.http.post(this.url+`getInListRegion`,{ str: name});
    };

    InListInfectCourses(name: string): Observable<object>{
        return this.http.post(this.url+`getInListInfectCourses`,{ "str": name});
    };

    InListCountries(name: string): Observable<object>{
        return this.http.post(this.url+`getInListCountries`,{ str: name});
    };

    InListPlaceChecks(name: string): Observable<object>{
        return this.http.post(this.url+`getInListPlaceChecks`,{ str: name});
    };

    InListCodeMkb10s(name: string): Observable<object>{
        return this.http.post(this.url+`getInListCodeMkb10s`,{ str: name});
    };

    InListCheckCourseLong(name: string): Observable<object>{
        return this.http.post(this.url+`getInListCheckCourseLong`,{ str: name});
    };

    InListCheckCourseShort(name: string): Observable<object>{
        return this.http.post(this.url+`getInListCheckCourseShort`,{ str: name});
    };

    InListInfectCourseLong(name: string): Observable<object>{
        return this.http.post(this.url+`getInListInfectCourseLong`,{ str: name});
    };

    InListInfectCourseShort(name: string): Observable<object>{
        return this.http.post(this.url+`getInListInfectCourseShort`,{ str: name});
    };

    InListDieCourseLong(name: string): Observable<object>{
        return this.http.post(this.url+`getInListDieCourseLong`,{ str: name});
    };

    InListDieCourseShort(name: string): Observable<object>{
        return this.http.post(this.url+`getInListDieCourseShort`,{ str: name});
    };

    InListVulnerableGroup(name: string): Observable<object>{
        return this.http.post(this.url+`getInListVulnerableGroup`,{ str: name});
    };

    InListArvt(name: string): Observable<object>{
        return this.http.post(this.url+`getInListArvt`,{ str: name});
    };

    InListInvalid(name: string): Observable<object>{
        return this.http.post(this.url+`getInListInvalid`,{ str: name});
    };

    InListCheckPlace(name: string): Observable<object>{
        return this.http.post(this.url+`getInListCheckPlace`,{ str: name});
    };

    InListIbResult(name: string): Observable<object>{
        return this.http.post(this.url+`getInListIbResult`,{ str: name});
    };

    InListDeseases(name: string): Observable<object>{
        return this.http.post(this.url+`getInListDeseases`,{ str: name});
    };

    InListStage(name: string): Observable<object>{
        return this.http.post(this.url+`getInListStage`,{ str: name});
    };

    InListCorrespIllnesses(name: string): Observable<object>{
        return this.http.post(this.url+`getInListCorrespIllnesses`,{ str: name});
    };

    InListCureSchemaName(name: string): Observable<object>{
        return this.http.post(this.url+`getInListCureSchemaName`,{ str: name});
    };

    InListCureChangeName(name: string): Observable<object>{
        return this.http.post(this.url+`getInListCureChangeName`,{ str: name});
    };

    InListRangeTherapy(name: string): Observable<object>{
        return this.http.post(this.url+`getInListRangeTherapy`,{ str: name});
    };

    InListLpuName(name: string): Observable<object>{
        return this.http.post(this.url+`getInListLpuName`,{ str: name});
    };

    InListHospCourseName(name: string): Observable<object>{
        return this.http.post(this.url+`getInListHospCourseName`,{ str: name});
    };

    InListEducation(name: string): Observable<object>{
        return this.http.post(this.url+`getInListEducation`,{ str: name});
    };

    InListHospResult(name: string): Observable<object>{
        return this.http.post(this.url+`getInListHospResult`,{ str: name});
    };

    InListFammilyStatus(name: string): Observable<object>{
        return this.http.post(this.url+`getInListFammilyStatus`,{ str: name});
    };

    InListEmployment(name: string): Observable<object>{
        return this.http.post(this.url+`getInListEmployment`,{ str: name});
    };

    InListTrans(name: string): Observable<object>{
        return this.http.post(this.url+`getInListTrans`,{ str: name});
    };

    InListVac(name: string): Observable<object>{
        return this.http.post(this.url+`getInListVac`,{ str: name});
    };

    InListMkb10Covid(name: string): Observable<object>{
        return this.http.post(this.url+`getInListMkb10Covid`,{ str: name});
    };

    InListTransmisionMech(name: string): Observable<object>{
        return this.http.post(this.url+`getInListTransmisionMech`,{ str: name});
    };

    InListSituationDetect(name: string): Observable<object>{
        return this.http.post(this.url+`getInListSituationDetect`,{ str: name});
    };

    InListEpidDoctor(name: string): Observable<object>{
        return this.http.post(this.url+`getInListEpidDoctor`,{ str: name});
    };

    InListYn(name: string): Observable<object>{
        return this.http.post(this.url+`getInListYn`,{ str: name});
    };

    InListPatientCard(name: string): Observable<object>{
        return this.http.post(this.url+`getInListPatientCard`,{ str: name.toString()});
    };
}
