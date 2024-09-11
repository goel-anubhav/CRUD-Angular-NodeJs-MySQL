import { Component } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css'],
})
export class AddTutorialComponent {
  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false,
  };
  submitted = false;

  constructor(private tutorialService: TutorialService) {}

  // Save as Draft method
  saveAsDraft(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description,
      published: false, // Not published, just saved as draft
    };

    this.tutorialService.create(data).subscribe({
      next: (res) => {
        console.log('Saved as draft:', res);
        this.submitted = true;
        alert('Tutorial saved as draft successfully!');
      },
      error: (e) => console.error(e),
    });
  }

  // Save and Publish method
  saveTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description,
      published: true, // Set to published true
    };

    this.tutorialService.create(data).subscribe({
      next: (res) => {
        console.log('Published:', res);
        this.submitted = true;
        alert('Tutorial published successfully!');
      },
      error: (e) => console.error(e),
    });
  }

  // Clear the form fields
  clearText(): void {
    this.tutorial.title = '';
    this.tutorial.description = '';
  }

  // Create new tutorial, resetting the form
  newTutorial(): void {
    this.submitted = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false,
    };
  }
}
