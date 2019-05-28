import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AirplaneService} from '../Services/airplane.service';
import {Airplane} from '../Models/airplane.model';

@Component({
  selector: 'app-list-airplane',
  templateUrl: './list-airplane.component.html'
})
export class ListAirplaneComponent implements OnInit {

  airplanes: Airplane[];

  constructor(private router: Router, private airplaneService: AirplaneService) { }

  ngOnInit() {
    this.airplaneService.getAirplanes()
      .subscribe( data => {
        this.airplanes = data;
      });
  }

  deleteAirplane(airplane: Airplane): void {
    this.airplaneService.deleteAirplane(airplane.id)
      .subscribe( data => {
        this.airplanes = this.airplanes.filter(u => u !== airplane);
      });
  }

  editAirplane(airplane: Airplane): void {
    localStorage.removeItem('editAirplaneId');
    localStorage.setItem('editAirplaneId', airplane.id.toString());
    this.router.navigate(['edit-airplane']);
  }

  addAirplane(): void {
    this.router.navigate(['add-airplane']);
  }
}
