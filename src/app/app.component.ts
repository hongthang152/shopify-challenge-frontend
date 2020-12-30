import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { ImageService } from 'src/app/image.service';
import { NotificationService } from 'src/app/notification.service';
import { Alert, AlertType } from 'src/models/alert.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('file_input', { static: false }) file_input_el;
  @ViewChild('modal', { static: false }) modal;
  @ViewChild('modal_caption', { static : false }) modal_caption;
  @ViewChild('modal_img', { static: false }) modal_img;

  title = 'shopify-challenge-frontend';
  AlertType = AlertType;
  alertObservable$: Observable<Alert> = this.notiService.onAlert();
  searchSubject$: Subject<string> = new Subject();
  imagesObservable$: Observable<string[]> = this.searchSubject$.pipe(
    switchMap((search: string) => this.imageService.get(search))
  )

  ngOnInit() {
    // .subscribe(
    //   (alert: Alert) => {
    //     console.log(alert);
    //   }
    // )  
    // this.alertObservable$.subscribe((alert: any) => console.log(alert));
    
  }

  ngAfterViewInit() {
    this.searchSubject$.next("");
  }

  showImageUploadInput() {
    this.file_input_el.nativeElement.click();
  }

  search(value: string) {
    this.searchSubject$.next(value);
  }

  upload(files: FileList) {
    if(files == null || files.length == 0) return;
    var formData: FormData = new FormData();

    for(var i = 0; i < files.length; i++) {
      var file = files.item(i);
      formData.append('photos', file);
    }

    this.imageService.upload(formData).pipe(
      tap(() => this.searchSubject$.next(""))
    ).subscribe();
  }

  showModal(image: string) {
    let el = this.modal.nativeElement;
    el.style.display = "block";
    el.src = image;
    this.modal_img.nativeElement.src = image
    this.modal_caption.nativeElement.innerHTML = image.substring(image.indexOf('_') + 1);
  }

  closeModal() {
    this.modal.nativeElement.style.display = "none";
  }

  constructor(public notiService: NotificationService,
    private imageService: ImageService) { }
}

