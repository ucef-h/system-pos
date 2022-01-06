import { Directive, ElementRef, HostBinding, HostListener, OnInit } from "@angular/core";

@Directive({
    selector: '[appBasicHighlight]'
})
export class BasicHighlightDirective implements OnInit {
    @HostBinding('style.backgroundColor') backgroundColor: string;

    constructor(private elementRef: ElementRef) {
        
    }
    
    ngOnInit(): void {
        this.elementRef.nativeElement.style.backgroundColor = 'green';
    }

    @HostListener('mouseenter') mouseover(eventData: Event) {
        this.backgroundColor = 'yellow';
    }
    
    @HostListener('mouseleave') mouseleave(eventData: Event) {
        this.backgroundColor = 'orange';
    }
}