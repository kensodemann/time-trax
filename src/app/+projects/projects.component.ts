import { Component, OnInit } from '@angular/core';
import { Project } from '../data/models/project';
import { ProjectService } from '../data/services/project/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {
  projects: Array<Project>;

  constructor(private data: ProjectService) { }

  ngOnInit() {
    this.data.getAll().subscribe(res => this.projects = res);
  }

}
