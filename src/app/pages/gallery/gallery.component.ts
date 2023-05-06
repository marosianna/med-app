import { Component, OnInit } from '@angular/core';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryService } from '../../shared/services/gallery.service';
import { Image } from '../../shared/models/Image';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  galleryObject?: Array<Image>;
  chosenImage?: Image;

  constructor(private galleryService: GalleryService) { 
  }

  ngOnInit(): void {
    this.galleryService.loadImageMeta('img.json').subscribe((data: Array<Image>)=>{
      console.log(data);
      this.galleryObject = data;
    })
  }

  loadImage(imageObject:Image){
    this.chosenImage = imageObject;
  }
}
