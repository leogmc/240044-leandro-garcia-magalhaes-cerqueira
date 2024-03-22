import { Component } from '@angular/core';

//@angular/material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Suino } from '../../models/suino.model';
import { BancoService } from '../../utils/banco.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SessaoService } from '../../utils/sessao.service';

@Component({
  selector: 'app-cadastro-sessao',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatDatepickerModule,MatSelectModule, ReactiveFormsModule, CommonModule, MatNativeDateModule, MatButton],
  templateUrl: './cadastro-sessao.component.html',
  styleUrl: './cadastro-sessao.component.css'
})
export class CadastroSessaoComponent {

  sessaoForm!: FormGroup;
  suinos!: Suino[];
  
 constructor(private servico: BancoService,private formBuilder: FormBuilder, private sessaoService: SessaoService){}


 ngOnInit(): void {
  this.carregarSuinos();
  this.sessaoForm = this.formBuilder.group({
    data: ['', Validators.required],
    descricao: ['', Validators.required],
    brincos: [[]], // Inicializa com um array vazio
    atividadesPlanejadas: [[]] // Inicializa com um array vazio
   
  });
}

  carregarSuinos() {
    this.servico.getSuinos().subscribe(suinos => {
      this.suinos = suinos;
    });
  }


  onSubmit() {
    if (this.sessaoForm.valid) {
      const novaSessao = this.sessaoForm.value;
      console.log('Nova Sessão:', novaSessao);
      this.sessaoService.adicionarSessao(novaSessao);
      this.sessaoForm.reset();
    }
  }

  addAtividade() {
    const atividadeSelecionada = this.sessaoForm.get('atividadesPlanejadas')?.value;
    const atividadesArray = this.sessaoForm.get('atividadesPlanejadas');
    if (atividadeSelecionada && atividadesArray) {
      atividadesArray.setValue([...atividadesArray.value, atividadeSelecionada]);
    }
  }

  addSuino() {
    const suinoSelecionado = this.sessaoForm.get('brincos')?.value;
    const brincosControl = this.sessaoForm.get('brincos');
    if (suinoSelecionado && brincosControl) {
      const brincosArray = [...brincosControl.value, suinoSelecionado];
      brincosControl.setValue(brincosArray);
    }
  }
  

}
