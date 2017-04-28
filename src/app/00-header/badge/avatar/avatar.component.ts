
import { Component } from '@angular/core';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
    private imgCenter: string = 'assets/images/avatar/a_0_128.png';
    img = this.imgCenter;
}
