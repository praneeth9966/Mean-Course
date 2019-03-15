import { AbstractControl } from '@angular/forms';
import {Observable, Observer, of} from 'rxjs';
export const mimeType = (
    control: AbstractControl
): Promise<{[key: string]:any}> | Observable<{[key: string]: any}> => {
    const file = control.value as File;
    const fileReader = new FileReader();
    const frObs = Observable.create((observer: Observer<{[key: string]: any}>)=>{
        if(typeof(control.value) === 'string'){
            return of(null);
        }
        fileReader.addEventListener("loadend", () =>{
            const arr = new Uint8Array( <ArrayBuffer>fileReader.result).subarray(0,4);
            let header = "";
            let isValid = false;
            for(let i=0; i<arr.length; i++){
                header+=arr[i].toString(16);
            }
            switch(header){
                case "89504e47":
                this.isValid = true;
                break;
                case "ffd8ffe0":
                case "ffd8ffe1":
                case "ffd8ffe2":
                case "ffd8ffe3":
                case "ffd8ffe8":
                this.isValid = true;
                break;
                default:
                this.isValid = false;
                break;
            }
            if(this.isValid){
                observer.next({invalidMimeType: true});
            }
            observer.complete();
        });
    });
    return frObs;
};