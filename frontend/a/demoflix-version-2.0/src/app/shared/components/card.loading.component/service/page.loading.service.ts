import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PageLoadingService {
     infoCardLoading = signal<{title: string, description: string}>({
      title: "Default Title",
      description: "Default description"
  })
  
  updateMessage(title: string, description: string){
    this.infoCardLoading.set({
      title: title,
      description: description
    })
  }
}
