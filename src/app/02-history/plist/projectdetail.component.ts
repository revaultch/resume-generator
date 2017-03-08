import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { Project } from '../../common/project.model';

@Component({
  selector: 'app-projectdetail',
  templateUrl: 'projectdetail.component.html',
  styleUrls: ['projectdetail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectdetailComponent {

    @Input() project: Project;


}
