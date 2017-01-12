import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './00-header/header.component';
import { ContactComponent } from './00-header/contact/contact.component';
import { IntroComponent } from './00-header/intro/intro.component';
import { MenuComponent } from './00-header/menu/menu.component';
import { AvatarComponent } from './00-header/intro/avatar/avatar.component';
import { AtaglanceComponent } from './01-ataglance/ataglance.component';
import { HistoryComponent } from './02-history/history.component';
import { HistoryService } from './02-history/history.service';
import { SkillsComponent } from './04-skills/skills.component';
import { SkillsService } from './04-skills/skills.service';
import { CompaniesComponent } from './05-companies/companies.component';
import { LogoStripComponent } from './05-companies/logo/logo-strip.component';
import { LogoComponent } from './05-companies/logo/logo.component';
import { RatesComponent } from './07-rates/rates.component';
import { ContactFormComponent } from './08-contactform/contactform.component';
import { FooterComponent } from './10-footer/footer.component';
import { KnobComponent } from '../ext/knob/knob.component';
import { DataService } from './common/data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    IntroComponent,
    MenuComponent,
    ContactFormComponent,
    AvatarComponent,
    AtaglanceComponent,
    HistoryComponent,
    SkillsComponent,
    CompaniesComponent,
    LogoStripComponent,
    LogoComponent,
    ContactComponent,
    RatesComponent,
    FooterComponent,
    KnobComponent
  ],
  entryComponents: [LogoStripComponent, LogoComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [DataService, SkillsService, HistoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
