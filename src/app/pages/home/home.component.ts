import { AfterViewInit, Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit(): void {
    if (typeof document !== 'undefined') {
      const track = document.querySelector('.carousel-track') as HTMLElement;
      const slides = Array.from(track.children) as HTMLElement[];
      const nextButton = document.querySelector('#scroll-right') as HTMLElement;
      const prevButton = document.querySelector('#scroll-left') as HTMLElement;
      const slideWidth = slides[0].getBoundingClientRect().width;

      let currentIndex = 0;

      this.renderer.listen(nextButton, 'click', () => {
        currentIndex++;
        if (currentIndex >= slides.length) {
          currentIndex = 0;
        }
        const amountToMove = -slideWidth * currentIndex;
        track.style.transform = `translateX(${amountToMove}px)`;
      });

      this.renderer.listen(prevButton, 'click', () => {
        currentIndex--;
        if (currentIndex < 0) {
          currentIndex = slides.length - 1;
        }
        const amountToMove = -slideWidth * currentIndex;
        track.style.transform = `translateX(${amountToMove}px)`;
      });
    }
  }
}
