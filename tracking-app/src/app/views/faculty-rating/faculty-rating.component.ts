import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import calculateAvgRating, { Faculty } from 'src/models/users/faculty.model';
import { Admin } from '../../../models/users/admin.model';
import { Coordinator } from '../../../models/users/coordinator.model';
import { Rating } from '../../../models/users/rating.model';
import { JsonConvertionsService } from '../../services/json-convertions.service';
import { PersistenceService } from '../../services/persistence.service';
import { RestApiService } from '../../services/rest-api.service';

@Component({
  selector: 'app-faculty-rating',
  templateUrl: './faculty-rating.component.html',
  styleUrls: ['./faculty-rating.component.css'],
})
export class FacultyRatingComponent implements OnInit {
  constructor(
    private _router: Router,
    private _localStorage: PersistenceService,
    private _restApi: RestApiService,
    private _convert: JsonConvertionsService,
    private _activatedRoute: ActivatedRoute
  ) {}

  public user: Coordinator | Admin = new Coordinator();
  public faculty = new Faculty();
  public newRating = new Rating();
  errorMessage: any;
  isError: boolean = false;
  ratings: Rating[] = [];
  u_id: number = -1;
  ratingValues: number[] = [];
  averageRating: number = 0.0;

  async ngOnInit() {
    this.user = this._localStorage.getSessionObject('user');
    this.u_id = Number(this._activatedRoute.snapshot.paramMap.get('id'));
    this.faculty = await this._restApi.getFacultyById(this.u_id);
    this.ratings = await this._restApi.getFacultyRatingsById(this.faculty.u_id);
    if (this.ratings.length > 0) {
      this.ratings.forEach((rating) => {
        this.ratingValues.push(<number>rating.rating_value);
      });
      this.averageRating = calculateAvgRating(this.ratingValues);
    }
    console.log('rating values:', this.ratingValues);
    console.log('faculty:', this.faculty)
  }

  onSubmit(facultyRatingForm: NgForm) {
    this.newRating.rating_value = Number(
      facultyRatingForm.control.get('rating')?.value
    );
    console.log('value:', this.newRating.rating_value);
    this.newRating.u_id = this.faculty.u_id;
    this._restApi.postFetch(this.newRating, '/ratings', 'post');
    // Add success msg go back to List faculty page?
    location.reload();
  }
}
