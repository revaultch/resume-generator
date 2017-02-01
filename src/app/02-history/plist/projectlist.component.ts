import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { Project } from '../../common/project.model';

@Component({
  selector: 'app-projectlist',
  templateUrl: './projectlist.component.html',
  styleUrls: ['./projectlist.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectlistComponent {

    @Input() projects: Array<Project>;
    @Output() onSelection = new EventEmitter();

    private _selected: Project;

    private _windowLoaded = false;

    @HostListener('window:load')
    onLoad() {
      this._windowLoaded = true;
    }


    select(project: Project) {
      this._selected = project;
      this.onSelection.emit({ value: project});
    }

    projectTrackByFn(i: number, project: Project) {
      return project.id;
    }

    getBackground(project: Project) {
      let logo = this._windowLoaded ? project.logo : 'nologo';
      return 'url(assets/images/logos/' + logo + '.png)';
    }


}
