import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ItemComponent } from '../interfaces/item-component';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';


const endpoint = 'http://node.marcosraudkett.com:8083/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    

  })
};

@Injectable({
  providedIn: 'root'
})

export class FormDatabaseService {
  formTitle: string;
  formId: string;
  i: number;
  ready: boolean=false;


  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
  
  postFormAPI(formTitle): Observable<any> {
    return this.http.post(endpoint + 'forms?title=' + formTitle,null);
  }  

  getFormAPI(formId): Observable<any> {
    return this.http.get(endpoint + 'forms/' + formId);

  }

  getFormDataAPI(formId): Observable<any> {
    this.ready =true;
    return this.http.get(endpoint + 'formData/' + formId);
   
  }

  getFormsAPI(): Observable<any> {
    return this.http.get(endpoint + 'forms');
  }

  putFormAPI(formId, formData): Observable<any> {
    return this.http.put(endpoint + 'formData/' + formId + "?formData=" + formData,null);
  }

  deleteFormAPI(formId): Observable<any> {
    return this.http.delete(endpoint + 'forms/' + formId);
  }
  
  constructor(private http: HttpClient) { 
    this.formTitle = '';
    this.formId = '';

  }

    deleteForm(formId): Promise<any>{
      return new Promise(resolve=>{ 
        this.deleteFormAPI(formId).subscribe((data:any) => {
          resolve(data);
        });
      });
    }
  
    saveForm(formId, formData): Promise<any>{
      return new Promise(resolve=>{ 
        this.putFormAPI(formId, formData).subscribe((data:any) => {
          resolve(data);
        });
      });
    }
  
    loadForms(): Promise<any>{
      return new Promise(resolve=>{ 
        this.getFormsAPI().subscribe((data:any) => {
          resolve(data);
        });
      });
    }
  
    loadFormData(formId): Promise<any>{
      return new Promise(resolve=>{ 
        this.getFormDataAPI(formId).subscribe((data:any) => {
          resolve(data);
        });
      });
    }
  
    loadForm(formId): Promise<any>{
      return new Promise(resolve=>{ 
        this.getFormAPI(formId).subscribe((data:any) => {
          resolve(data);
        });
      });
    }
  
    newForm(formTitle): Promise<any>{
      return new Promise(resolve=>{ 
        this.postFormAPI(formTitle).subscribe((data:any) => {
          resolve(data);
        });
      });
    }



}

