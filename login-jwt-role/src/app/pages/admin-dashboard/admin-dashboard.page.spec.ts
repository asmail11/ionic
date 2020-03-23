import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminDasgboardPage } from './admin-dashboard.page';

describe('AdminDasgboardPage', () => {
  let component: AdminDasgboardPage;
  let fixture: ComponentFixture<AdminDasgboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDasgboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDasgboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
