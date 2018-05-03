import { Component, OnInit } from '@angular/core';
import { SamplesService} from '../sample.service';
import {Sample} from '../sample';

@Component({
  selector: 'app-sample-list',
  templateUrl: './sample-list.component.html',
  styleUrls: ['./sample-list.component.css']
})
export class SampleListComponent implements OnInit {

  public samples: Sample[] = [];

  constructor(private sampleService: SamplesService) { }

  ngOnInit() {
    this.sampleService.getAll().subscribe(
      (samples: Sample[]) => {
        this.samples = samples;
      });
  }

}