import {
  animate,
  group,
  keyframes,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.css'],
  animations: [
    trigger('divState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0)',
        })
      ),
      state(
        'highlighted',
        style({
          backgroundColor: 'blue',
          transform: 'translateX(600px)',
        })
      ),
      transition('normal <=> highlighted', animate(500)), // <=> for backward & forward
      // transition('highlighted => normal', animate(800)),
    ]),
    trigger('wildState', [
      state(
        'normal',
        style({
          'background-color': 'red',
          transform: 'translateX(0) scale(1)',
        })
      ),
      state(
        'highlighted',
        style({
          backgroundColor: 'blue',
          transform: 'translateX(600px) scale(1)',
        })
      ),
      state(
        'shrunken',
        style({
          backgroundColor: 'green',
          transform: 'translateX(0px) scale(0.5)',
        })
      ),
      transition('normal <=> highlighted', animate(500)),
      // to define state in between state
      transition('shrunken <=> *', [
        style({
          backgroundColor: 'orange',
        }),
        animate(
          1000,
          style({
            borderRadius: '50px',
          })
        ),
        animate(500),
      ]), // * is any state
    ]),
    trigger('list1', [
      state(
        'one',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      // void is a state of element which is not in the dom yet
      // since there is no starting state
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)',
        }),
        animate(500),
      ]),
      transition('* => void', [
        animate(
          500,
          style({
            transform: 'translateX(100px)',
            opacity: 0,
          })
        ),
      ]),
    ]),
    trigger('list2', [
      state(
        'one',
        style({
          opacity: 1,
          transform: 'translateX(0)',
        })
      ),
      // keyframes is used to define which style should take at which time
      transition('void => *', [
        animate(
          2000,
          keyframes([
            style({ transform: 'translateX(-100px)', opacity: 0, offset: 0 }),
            style({
              transform: 'translateX(-75px)',
              opacity: 0.25,
              backgroundColor: 'green',
              offset: 0.25,
            }),
            style({
              transform: 'translateX(-25px)',
              opacity: 0.75,
              backgroundColor: 'green',
              offset: 0.75,
            }),
            style({
              transform: 'translateX(0px)',
              opacity: 1,
              offset: 1,
            }),
          ])
        ),
      ]),
      transition('* => void', [
        // multiple animations at the same time
        group([
          animate(300, style({ color: 'red' })),
          animate(
            500,
            style({
              transform: 'translateX(100px)',
              opacity: 0,
            })
          ),
        ]),
      ]),
    ]),
  ],
})
export class AnimationsComponent implements OnInit {
  state = 'normal';
  wildState = 'normal';
  list = ['One', 'Two', 'Three'];

  constructor() {}

  ngOnInit(): void {}

  onAdd(item): void {
    if (item !== '') {
      this.list.push(item);
    }
  }

  onDelete(item): void {
    this.list.splice(this.list.indexOf(item), 1);
  }

  onAnimate(): void {
    this.state === 'normal'
      ? (this.state = 'highlighted')
      : (this.state = 'normal');
    this.wildState === 'normal'
      ? (this.wildState = 'highlighted')
      : (this.wildState = 'normal');
  }
  onShrink(): void {
    this.wildState = 'shrunken';
  }

  animationStart(event): void {
    console.log(event);
  }

  animationDone(event): void {
    console.log(event);
  }
}
