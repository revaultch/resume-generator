import { ActivatedRoute, RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PageComponent } from './page.component';
import { HeaderComponent } from './00-header/header.component';
import { ContactComponent } from './00-header/contact/contact.component';
import { BadgeComponent } from './00-header/badge/badge.component';
import { MenuComponent } from './00-header/menu/menu.component';
import { AvatarComponent } from './00-header/badge/avatar/avatar.component';
import { AtaglanceComponent } from './01-ataglance/ataglance.component';
import { DetailBoxComponent } from './01-ataglance/detailbox/detailbox.component';
import { HistoryComponent } from './02-history/history.component';
import { HistoryService } from './02-history/history.service';
import { TimelineComponent } from './02-history/timeline/timeline.component';
import { ProjectlistComponent } from './02-history/plist/projectlist.component';
import { ProjectdetailComponent } from './02-history/plist/projectdetail.component';
import { SkillsComponent } from './04-skills/skills.component';
import { SkilllistComponent } from './04-skills/skilllist/skilllist.component';
import { SkillsService } from './04-skills/skills.service';
import { CompaniesComponent } from './05-companies/companies.component';
import { CompanyLogoComponent } from './05-companies/companylogo.component';
import { RatesComponent } from './07-rates/rates.component';
import { ContactFormComponent } from './08-contactform/contactform.component';
import { FooterComponent } from './10-footer/footer.component';
import { KnobComponent } from '../ext/knob/knob.component';
import { DataService } from './common/data.service';
import { WindowRef } from './common/window/windowref.service';
import { WorkflowEventService } from './common/workflow/workflowevent.service';
import { LoadedDirective } from './common/directives/loaded.directive';
import { I18nDirective } from './common/directives/i18n.directive';
import { i18nService } from './common/directives/i18n.service';

import { RateBoxComponent } from './07-rates/ratebox/rate-box.component';
import { EmailCaptureComponent } from './common/email-capture/email-capture.component';
import { FormSpreeService } from './common/services/formspree/form-spree.service';


@NgModule({
  declarations: [
    AppComponent,
    PageComponent,
    HeaderComponent,
    BadgeComponent,
    MenuComponent,
    ContactFormComponent,
    AvatarComponent,
    AtaglanceComponent,
    DetailBoxComponent,
    HistoryComponent,
    TimelineComponent,
    ProjectlistComponent,
    ProjectdetailComponent,
    SkillsComponent,
    SkilllistComponent,
    CompaniesComponent,
    CompanyLogoComponent,
    ContactComponent,
    RatesComponent,
    FooterComponent,
    KnobComponent,
    RateBoxComponent,
    LoadedDirective,
    I18nDirective,
    EmailCaptureComponent
  ],
  entryComponents: [], // used for dynamically allocated components
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule
  ],
  providers: [DataService, SkillsService, HistoryService, WindowRef, WorkflowEventService, i18nService, FormSpreeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
