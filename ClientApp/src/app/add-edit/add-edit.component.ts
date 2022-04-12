import { Component, Inject, OnInit, NgModule } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({   
    selector: 'app-add-edit',
    templateUrl: './add-edit.component.html' 
})
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id!: string;
    isAddMode!: boolean;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        @Inject('BASE_URL') private baseUrl: string
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        const formOptions: AbstractControlOptions = {};
        this.form = this.formBuilder.group({
            temperatureC: ['', Validators.required],
            summary: ['', Validators.required]
        }, formOptions);

        if (!this.isAddMode) {
            this.http.get<WeatherForecast[]>(this.baseUrl + 'weatherforecast/' + this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        this.loading = true;
        if (this.isAddMode) {
            this.createForecast(this.form.value);
            this.router.navigate(['/crud'], { relativeTo: this.route });
        } else {
            this.updateForecast(this.form.value);
            this.router.navigate(['/crud'], { relativeTo: this.route });
        }
    }

    private updateForecast(forecast : WeatherForecast): Observable<any> {
        const headers = { 'content-type': 'application/json'} ;
        const body = JSON.stringify(forecast);
        return this.http.put(this.baseUrl + 'weatherforecast', body, {'headers': headers});
    }

    private createForecast(forecast : WeatherForecast): Observable<any> {
        const headers = { 'content-type': 'application/json'} ;
        const body = JSON.stringify(forecast);
        return this.http.post(this.baseUrl + 'weatherforecast', body, {'headers': headers});
    }
}

interface WeatherForecast {
    id: number;
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
  }