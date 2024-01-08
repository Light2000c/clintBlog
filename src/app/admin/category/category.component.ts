import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralModule } from '../../general/general.module';
import { ScriptService } from '../../services/script.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data/data.service';
import { ENDPOINTS } from '../../providers/data/endpoints';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, GeneralModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})
export class CategoryComponent {

  routerSubscription: any;
  public categories: any[] = [];
  public form!: FormGroup;
  public busy: boolean = false;
  public submitAttempt: boolean = false;
  public endpoint = ENDPOINTS;
  public message: string = "";
  public displayType!: String;

  constructor(
    public scriptService: ScriptService,
    public formBuilder: FormBuilder,
    public data: DataService
  ) {
    this.scriptService.init("admin");

    this.form = this.formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
    });
  }

  async ngOnInit() {

    await this.load();
  }


  public async load(force = false) {
    if (force) {
      await this.data.fetchCategories(this.endpoint.category);
      this.categories = this.data.getCategories();
      console.log("categories ==>", this.categories);
    } else {
      if (!this.data.categoriesLoaded) {
        await this.data.fetchCategories(this.endpoint.category);
        this.categories = this.data.getCategories();
        console.log("categories ==>", this.categories);
      }else{
        this.categories = this.data.getCategories();
      }
    }
  }

  public async send() {
    this.message = "";
    this.submitAttempt = true;

    if (this.form.valid) {

      const response = await this.data.addCategory(this.endpoint.category, this.form.value);

      console.log("response is ==>", response)

      if ((response as any).status == "success") {
        this.message = "Category has been successfully added.";
        this.displayType = "success";
        await this.load(true);
        this.submitAttempt = false;
        this.form.reset();
      } else {
        this.message = "Category was not successfully added.";
        this.displayType = "error";
      }
    }
  }


  public async deleteCategory(id: any) {

    const response = await this.data.deleteCatgeory(this.endpoint.category, id);

    console.log(response);

    if ((response as any).status == "success") {
      this.load(true);
    }
  }
}
