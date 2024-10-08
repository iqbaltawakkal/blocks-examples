import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import * as UC from '@uploadcare/file-uploader';
import { OutputFileEntry } from '@uploadcare/file-uploader';

UC.defineComponents(UC);

@Component({
  selector: 'minimal-view',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './minimal-view.component.html',
  styleUrl: './minimal-view.component.scss',
})
export class MinimalViewComponent {
  @Input() files: OutputFileEntry<'success'>[] = [];
  @Output() filesChange = new EventEmitter<OutputFileEntry<'success'>[]>();

  @ViewChild('ctxProvider', { static: true }) ctxProviderRef!: ElementRef<
    InstanceType<UC.UploadCtxProvider>
  >;

  ngOnInit() {
    /*
      Note: Event binding is the main way to get data and other info from File Uploader.
      There plenty of events you may use.

      See more: https://uploadcare.com/docs/file-uploader/events/
     */
    this.ctxProviderRef.nativeElement.addEventListener(
      'change',
      this.handleChangeEvent,
    );
  }

  ngOnDestroy() {
    this.ctxProviderRef.nativeElement.removeEventListener(
      'change',
      this.handleChangeEvent,
    );
  }

  handleChangeEvent = (e: UC.EventMap['change']) => {
    console.log('change event payload:', e);

    this.files = e.detail.allEntries.filter(f => f.status === 'success') as OutputFileEntry<'success'>[];
  };

  formatSize = (bytes: number | null) => {
    if (!bytes) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return `${parseFloat((bytes / k ** i).toFixed(2))} ${sizes[i]}`;
  };
}
