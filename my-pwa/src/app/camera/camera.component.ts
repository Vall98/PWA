import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.css']
})
export class CameraComponent implements OnInit {

//  stream: any;

  constructor() { }

  ngOnInit(): void {
  }
  /*
  getUserMedia(options, successCallback, failureCallback) {
    var api = navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if (api) {
      return api.bind(navigator)(options, successCallback, failureCallback);
    }
  }

  getStream() {
    if (!navigator.getUserMedia && !navigator.webkitGetUserMedia &&
      !navigator.mozGetUserMedia && !navigator.msGetUserMedia) {
      alert('User Media API not supported.');
      return;
    }
    
    var constraints = {
      video: true
    };
  
    getUserMedia(constraints, function (stream) {
      var mediaControl = document.querySelector('video');
      if ('srcObject' in mediaControl) {
        mediaControl.srcObject = stream;
      } else if (navigator.mozGetUserMedia) {
        mediaControl.mozSrcObject = stream;
      } else {
        mediaControl.src = (window.URL || window.webkitURL).createObjectURL(stream);
      }
      this.stream = stream;
    }, function (err) {
      alert('Error: ' + err);
    });
  }
  
  takePhoto() {
    if (!('ImageCapture' in window)) {
      alert('ImageCapture n\'est pas disponnible');
      return;
    } else if (!this.stream) {
      return;
    }
    
    var theImageCapturer = new ImageCapture(theStream.getVideoTracks()[0]);
  
    theImageCapturer.takePhoto()
      .then(blob => {
        var theImageTag = document.getElementById("imageTag");
        theImageTag.src = URL.createObjectURL(blob);
      })
      .catch(err => alert('Error: ' + err));
*/
}
