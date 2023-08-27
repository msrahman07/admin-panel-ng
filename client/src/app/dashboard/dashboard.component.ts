import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  name = 'CHATGPT';
  dragTarget: number | null = null;

  onDragStart(event: DragEvent) {
    // Only allow dragging if the variable name is in the box
    if (event.target instanceof HTMLDivElement && event.target.textContent?.includes(this.name)) {
      event.dataTransfer?.setData('text/plain', 'CHATGPT');
    } else {
      event.preventDefault();
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.target instanceof HTMLElement) {
      const targetIndex = Array.from(event.target.parentElement?.children!).indexOf(event.target);
      this.dragTarget = targetIndex;
      console.log(`Variable moved to box ${this.dragTarget + 1}`);
    }
  }
}
