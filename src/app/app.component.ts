import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { ErrService } from './services/err.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'HIV';

  constructor(
    public loading: LoadingService,
    public err: ErrService
  ){}
}
