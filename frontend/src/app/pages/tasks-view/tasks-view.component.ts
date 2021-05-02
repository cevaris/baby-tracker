import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tasks-view',
  templateUrl: './tasks-view.component.html',
  styleUrls: ['./tasks-view.component.scss']
})
export class TasksViewComponent implements OnInit {

  constructor(private route: ActivatedRoute) {
    const date = this.route.snapshot.queryParamMap.get('date');
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id, date);
  }

  ngOnInit(): void {
  }

}
