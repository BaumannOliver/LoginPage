import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {TweenMax, Expo, Quad} from 'gsap';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @ViewChild('armL') armL: ElementRef;
  @ViewChild('armR') armR: ElementRef;
  @ViewChild('eyeL') eyeL: ElementRef;
  @ViewChild('eyeR') eyeR: ElementRef;
  @ViewChild('nose') nose: ElementRef;
  @ViewChild('mouth') mouth: ElementRef;
  @ViewChild('mouthBG') mouthBG: ElementRef;
  @ViewChild('mouthSmallBG') mouthSmallBG: ElementRef;
  @ViewChild('mouthMediumBG') mouthMediumBG: ElementRef;
  @ViewChild('mouthLargeBG') mouthLargeBG: ElementRef;
  @ViewChild('mouthMaskPath') mouthMaskPath: ElementRef;
  @ViewChild('mouthOutline') mouthOutline: ElementRef;
  @ViewChild('tooth') tooth: ElementRef;
  @ViewChild('tongue') tongue: ElementRef;
  @ViewChild('chin') chin: ElementRef;
  @ViewChild('face') face: ElementRef;
  @ViewChild('eyebrow') eyebrow: ElementRef;
  @ViewChild('hair') hair: ElementRef;

  public email: any;
  public password: any;
  public mySVG: any;
  public caretPos: any;
  public curEmailIndex: any;
  public screenCenter: any;
  public svgCoords: any;
  public eyeMaxHorizD = 20;
  public eyeMaxVertD = 10;
  public noseMaxHorizD = 23;
  public noseMaxVertD = 10;
  public dFromC: any;
  public eyeDistH: any;
  public mouthStatus = 'small';
  public emailCoords: any;
  public caretCoords: any;
  public centerCoords: any;
  public outerEarL: any;
  public outerEarR: any;
  public earHairL: any;
  public earHairR: any;

  constructor(private readonly _login: LoginService) {}

  ngOnInit() {

    localStorage.clear();
    this.email = document.querySelector('.email');
    this.password = document.querySelector('.password');
    this.mySVG = document.querySelector('.svgContainer');
    this.outerEarL = document.querySelector('.earL .outerEar');
    this.outerEarR = document.querySelector('.earR .outerEar');
    this.earHairL = document.querySelector('.earL .earHair');
    this.earHairR = document.querySelector('.earR .earHair');

    TweenMax.set(this.armL.nativeElement, {x: -93, y: 220, rotation: 105, transformOrigin: 'top left'});
    TweenMax.set(this.armR.nativeElement, {x: -93, y: 220, rotation: -105, transformOrigin: 'top right'});

  }

  public sendToStorage(userName: string) {
    console.log('click event', userName);
    this._login.login(userName);
  }

  onEmailBlur(e) {
    if (e.target.value === '') {
      e.target.parentElement.classList.remove('focusWithText');
    }
    resetFace(this.eyeL.nativeElement, this.eyeR.nativeElement, this.nose.nativeElement, this.mouth.nativeElement, this.chin.nativeElement, this.face.nativeElement,
      this.eyebrow.nativeElement, this.outerEarL, this.outerEarR, this.earHairL, this.earHairR, this.hair.nativeElement);
  }

  onEmailInput(e) {
    this.getCoord(e);
    const value = e.target.value;
    this.curEmailIndex = value.length;

    // very crude email validation for now to trigger effects
    if (this.curEmailIndex > 0) {
      if (this.mouthStatus === 'small') {
        this.mouthStatus = 'medium';
        TweenMax.to([this.mouthBG.nativeElement, this.mouthOutline.nativeElement, this.mouthMaskPath.nativeElement], 1, {shapeIndex: 8, ease: Expo.easeOut});
        TweenMax.to(this.tooth.nativeElement, 1, {x: 0, y: 0, ease: Expo.easeOut});
        TweenMax.to(this.tongue.nativeElement, 1, {x: 0, y: 1, ease: Expo.easeOut});
        TweenMax.to([this.eyeL.nativeElement, this.eyeR.nativeElement], 1, {scaleX: .85, scaleY: .85, ease: Expo.easeOut});
      }
      if (value.includes('@')) {
        this.mouthStatus = 'large';
        TweenMax.to([this.mouthBG.nativeElement, this.mouthOutline.nativeElement, this.mouthMaskPath.nativeElement], 1, {ease: Expo.easeOut});
        TweenMax.to(this.tooth.nativeElement, 1, {x: 3, y: -2, ease: Expo.easeOut});
        TweenMax.to(this.tongue.nativeElement, 1, {y: 2, ease: Expo.easeOut});
        TweenMax.to([this.eyeL.nativeElement, this.eyeR.nativeElement], 1, {scaleX: .65, scaleY: .65, ease: Expo.easeOut, transformOrigin: 'center center'});
      } else {
        this.mouthStatus = 'medium';
        TweenMax.to([this.mouthBG.nativeElement, this.mouthOutline.nativeElement, this.mouthMaskPath.nativeElement], 1, {ease: Expo.easeOut});
        TweenMax.to(this.tooth.nativeElement, 1, {x: 0, y: 0, ease: Expo.easeOut});
        TweenMax.to(this.tongue.nativeElement, 1, {x: 0, y: 1, ease: Expo.easeOut});
        TweenMax.to([this.eyeL.nativeElement, this.eyeR.nativeElement], 1, {scaleX: .85, scaleY: .85, ease: Expo.easeOut});
      }
    } else {
      this.mouthStatus = 'small';
      TweenMax.to([this.mouthBG.nativeElement, this.mouthOutline.nativeElement, this.mouthMaskPath.nativeElement], 1, {shapeIndex: 9, ease: Expo.easeOut});
      TweenMax.to(this.tooth.nativeElement, 1, {x: 0, y: 0, ease: Expo.easeOut});
      TweenMax.to(this.tongue.nativeElement, 1, {y: 0, ease: Expo.easeOut});
      TweenMax.to([this.eyeL.nativeElement, this.eyeR.nativeElement], 1, {scaleX: 1, scaleY: 1, ease: Expo.easeOut});
    }
  }

  onEmailFocus(e) {
    e.target.parentElement.classList.add('focusWithText');
    this.getCoord(e);
  }

  onPasswordFocus(e) {
    this.coverEyes();
  }

  onPasswordBlur(e) {
    this.uncoverEyes();
  }

  coverEyes() {
    TweenMax.to(this.armL.nativeElement, .45, {x: -93, y: 2, rotation: 0, ease: Quad.easeOut});
    TweenMax.to(this.armR.nativeElement, .45, {x: -93, y: 2, rotation: 0, ease: Quad.easeOut, delay: .1});
  }

  uncoverEyes() {
    TweenMax.to(this.armL.nativeElement, 1.35, {y: 220, ease: Quad.easeOut});
    TweenMax.to(this.armL.nativeElement, 1.35, {rotation: 105, ease: Quad.easeOut, delay: .1});
    TweenMax.to(this.armR.nativeElement, 1.35, {y: 220, ease: Quad.easeOut});
    TweenMax.to(this.armR.nativeElement, 1.35, {rotation: -105, ease: Quad.easeOut, delay: .1});
  }

  getAngle(x1, y1, x2, y2) {
    const angle = Math.atan2(y1 - y2, x1 - x2);
    return angle;
  }

  getPosition(el) {
    let xPos = 0;
    let yPos = 0;

    while (el) {
      if (el.tagName === 'BODY') {
        // deal with browser quirks with body/window/document and page scroll
        const xScroll = el.scrollLeft || document.documentElement.scrollLeft;
        const yScroll = el.scrollTop || document.documentElement.scrollTop;

        xPos += (el.offsetLeft - xScroll + el.clientLeft);
        yPos += (el.offsetTop - yScroll + el.clientTop);
      } else {
        // for all other non-BODY elements
        xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
        yPos += (el.offsetTop - el.scrollTop + el.clientTop);
      }

      el = el.offsetParent;
    }
    return {
      x: xPos,
      y: yPos
    };
  }



  getCoord(e) {
    const carPos = this.email.selectionEnd,
      div = document.createElement('div'),
      span = document.createElement('span'),
      copyStyle = getComputedStyle(this.email)
    ;
    [].forEach.call(copyStyle, function(prop) {
      div.style[prop] = copyStyle[prop];
    });
    div.style.position = 'absolute';
    document.body.appendChild(div);
    div.textContent = this.email.value.substr(0, carPos);
    span.textContent = this.email.value.substr(carPos) || '.';
    div.appendChild(span);

    this.emailCoords = this.getPosition(this.email);				// console.log("emailCoords.x: " + emailCoords.x + ", emailCoords.y: " + emailCoords.y);
    this.caretCoords = this.getPosition(span);							// console.log("caretCoords.x " + caretCoords.x + ", caretCoords.y: " + caretCoords.y);
    this.centerCoords = this.getPosition(this.mySVG);							// console.log("centerCoords.x: " + centerCoords.x);
    this.svgCoords = this.getPosition(this.mySVG);
    this.screenCenter = this.centerCoords.x + (this.mySVG.offsetWidth / 2);		// console.log("screenCenter: " + screenCenter);
    this.caretPos = this.caretCoords.x + this.emailCoords.x;					// console.log("caretPos: " + caretPos);

    this.dFromC = this.screenCenter - this.caretPos; 							// console.log("dFromC: " + dFromC);
    let pFromC = Math.round((this.caretPos / this.screenCenter) * 100) / 100;
    if (pFromC < 1) {

    } else if (pFromC > 1) {
      pFromC -= 2;
      pFromC = Math.abs(pFromC);
    }

    this.eyeDistH = -this.dFromC * .05;
    if (this.eyeDistH > this.eyeMaxHorizD) {
      this.eyeDistH = this.eyeMaxHorizD;
    } else if (this.eyeDistH < -this.eyeMaxHorizD) {
      this.eyeDistH = -this.eyeMaxHorizD;
    }

    const eyeLCoords = {x: this.svgCoords.x + 84, y: this.svgCoords.y + 76};
    const eyeRCoords = {x: this.svgCoords.x + 113, y: this.svgCoords.y + 76};
    const noseCoords = {x: this.svgCoords.x + 97, y: this.svgCoords.y + 81};
    const mouthCoords = {x: this.svgCoords.x + 100, y: this.svgCoords.y + 100};
    const eyeLAngle = this.getAngle(eyeLCoords.x, eyeLCoords.y, this.emailCoords.x + this.caretCoords.x, this.emailCoords.y + 25);
    const eyeLX = Math.cos(eyeLAngle) * this.eyeMaxHorizD;
    const eyeLY = Math.sin(eyeLAngle) * this.eyeMaxVertD;
    const eyeRAngle = this.getAngle(eyeRCoords.x, eyeRCoords.y, this.emailCoords.x + this.caretCoords.x, this.emailCoords.y + 25);
    const eyeRX = Math.cos(eyeRAngle) * this.eyeMaxHorizD;
    const eyeRY = Math.sin(eyeRAngle) * this.eyeMaxVertD;
    const noseAngle = this.getAngle(noseCoords.x, noseCoords.y, this.emailCoords.x + this.caretCoords.x, this.emailCoords.y + 25);
    const noseX = Math.cos(noseAngle) * this.noseMaxHorizD;
    const noseY = Math.sin(noseAngle) * this.noseMaxVertD;
    const mouthAngle = this.getAngle(mouthCoords.x, mouthCoords.y, this.emailCoords.x + this.caretCoords.x, this.emailCoords.y + 25);
    const mouthX = Math.cos(mouthAngle) * this.noseMaxHorizD;
    const mouthY = Math.sin(mouthAngle) * this.noseMaxVertD;
    const mouthR = Math.cos(mouthAngle) * 6;
    const chinX = mouthX * .8;
    const chinY = mouthY * .5;
    let chinS = 1 - ((this.dFromC * .15) / 100);
    if (chinS > 1) {chinS = 1 - (chinS - 1); }
    const faceX = mouthX * .3;
    const faceY = mouthY * .4;
    const faceSkew = Math.cos(mouthAngle) * 5;
    const eyebrowSkew = Math.cos(mouthAngle) * 25;
    const outerEarX = Math.cos(mouthAngle) * 4;
    const outerEarY = Math.cos(mouthAngle) * 5;
    const hairX = Math.cos(mouthAngle) * 6;
    const hairS = 1.2;

    TweenMax.to(this.eyeL.nativeElement, 1, {x: -eyeLX , y: -eyeLY, ease: Expo.easeOut});
    TweenMax.to(this.eyeR.nativeElement, 1, {x: -eyeRX , y: -eyeRY, ease: Expo.easeOut});
    TweenMax.to(this.nose.nativeElement, 1, {x: -noseX, y: -noseY, rotation: mouthR, transformOrigin: 'center center', ease: Expo.easeOut});
    TweenMax.to(this.mouth.nativeElement, 1, {x: -mouthX , y: -mouthY, rotation: mouthR, transformOrigin: 'center center', ease: Expo.easeOut});
    TweenMax.to(this.chin.nativeElement, 1, {x: -chinX, y: -chinY, scaleY: chinS, ease: Expo.easeOut});
    TweenMax.to(this.face.nativeElement, 1, {x: -faceX, y: -faceY, skewX: -faceSkew, transformOrigin: 'center top', ease: Expo.easeOut});
    TweenMax.to(this.eyebrow.nativeElement, 1, {x: -faceX, y: -faceY, skewX: -eyebrowSkew, transformOrigin: 'center top', ease: Expo.easeOut});
    TweenMax.to(this.outerEarL, 1, {x: outerEarX, y: -outerEarY, ease: Expo.easeOut});
    TweenMax.to(this.outerEarR, 1, {x: outerEarX, y: outerEarY, ease: Expo.easeOut});
    TweenMax.to(this.earHairL, 1, {x: -outerEarX, y: -outerEarY, ease: Expo.easeOut});
    TweenMax.to(this.earHairR, 1, {x: -outerEarX, y: outerEarY, ease: Expo.easeOut});
    TweenMax.to(this.hair.nativeElement, 1, {x: hairX, scaleY: hairS, transformOrigin: 'center bottom', ease: Expo.easeOut});

    document.body.removeChild(div);
  }
}

const resetFace = (eyeL, eyeR, nose, mouth, chin, face, eyebrow, outerEarL, outerEarR, earHairL, earHairR, hair) => {
  TweenMax.to([eyeL, eyeR], 1, {x: 0, y: 0, ease: Expo.easeOut});
  TweenMax.to(nose, 1, {x: 0, y: 0, scaleX: 1, scaleY: 1, ease: Expo.easeOut});
  TweenMax.to(mouth, 1, {x: 0, y: 0, rotation: 0, ease: Expo.easeOut});
  TweenMax.to(chin, 1, {x: 0, y: 0, scaleY: 1, ease: Expo.easeOut});
  TweenMax.to([face, eyebrow], 1, {x: 0, y: 0, skewX: 0, ease: Expo.easeOut});
  TweenMax.to([outerEarL, outerEarR, earHairL, earHairR, hair], 1, {x: 0, y: 0, scaleY: 1, ease: Expo.easeOut});
};
