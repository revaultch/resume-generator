
import { Component } from '@angular/core';

@Component({
    selector: 'app-avatar',
    templateUrl: './avatar.component.html',
    styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent {
    private imgLeft: string = '/borja/assets/images/avatar/a_-1.png';
    private imgCenter: string = '/borja/assets/images/avatar/a_0_128.png';
    private imgRight: string = '/borja/assets/images/avatar/a_1.png';

    private img = this.imgCenter;

    mouseMoved(event) {
        if (event.clientX < window.innerWidth / 2 - (window.innerWidth / 10)) {
            this.img = this.imgLeft;
        } else if (event.clientX > window.innerWidth / 2 + (window.innerWidth / 10)) {
            this.img = this.imgRight;
        } else {
            this.img = this.imgCenter;
        }

    }

}
