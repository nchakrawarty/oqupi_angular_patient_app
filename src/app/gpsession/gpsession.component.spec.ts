import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GpsessionComponent } from './gpsession.component';

describe('GpsessionComponent', () => {
  let component: GpsessionComponent;
  let fixture: ComponentFixture<GpsessionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GpsessionComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GpsessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
