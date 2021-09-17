import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { FirestoreService } from 'src/app/services/firestore.service';
import { MateriasService } from 'src/app/services/materias.service';
import { MateriasInterface } from 'src/app/shared/materias';
import { PublicacionInterface } from 'src/app/shared/publicacion';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-edit-publicacion',
  templateUrl: './edit-publicacion.page.html',
  styleUrls: ['./edit-publicacion.page.scss'],
})
export class EditPublicacionPage implements OnInit {


  @Input() ObjectPubli:any;
  @Input() ObjectUser:any;
  
  

  public formEditPubli=new FormGroup({
    idMateria:new FormControl('',[Validators.required]),
    categoria:new FormControl('',[Validators.required]),
    titulo:new FormControl('',[Validators.required]),
    descripcion:new FormControl('',[Validators.required]),
    file:new FormControl(),
  });
  nombreMateria: string;
  listaMaterias: MateriasInterface[];

listaCatego:any;
//Subir file
filepath='';
//Para ver porcentaje de carga de la imagen y recuperar URL
progreso=false;
porcentaje=0;
porcentajesubida: Observable<number>;
url:string;
urlFile: Observable<string>;

/* Referencia de URL FILE */
@ViewChild('FileUrlUser') inputFile: ElementRef;

  constructor(
    private modalController: ModalController,
    private fireStore: FirestoreService,
    private materiasServ: MateriasService,
    private storage: AngularFireStorage,
    public toastController: ToastController
  ) {
   
    
    //this.obtenerMaterias(this.ObjectUser.carreraId);
   }

  ngOnInit() {
   
    const Usuario=this.ObjectUser
   

    this.getMateria(this.ObjectPubli.idMateria);
    this.obtenerMaterias(this.ObjectUser.carreraId);
    this.getCatego();

    this.rellenarForm();
    
    
   
  }

  //RELLENAR FORMULARIO
  rellenarForm(){
    this.formEditPubli.patchValue({idMateria:this.ObjectPubli.idMateria, 
      categoria:this.ObjectPubli.categoria, 
    titulo:this.ObjectPubli.titulo, 
    descripcion:this.ObjectPubli.descripcion, 
   // file:this.ObjectPubli.file
  });
  }
  


  //CERRAR MODAL
salirModal(){
  this.modalController.dismiss();
    }

   //OBTENER MATERIAS DEL Usuario
   obtenerMaterias(idC:string) {
 
    this.materiasServ.getCollection<MateriasInterface>('Materias').subscribe(res => {
      this.listaMaterias = res.filter(e => idC === e.idCarrera);
            
    });
  }  
  
    //CONSULTAR MATERIA
  getMateria(idMateria: string) {   
    this.fireStore.getDoc<MateriasInterface>('Materias', idMateria).subscribe(res => {
     this.nombreMateria = res.nombre; 
    });
  }

  //LEER CATEGORIA
  getCatego(){
    this.materiasServ.getCatego('Categoria').subscribe(res=>{
this.listaCatego=res;
    })
  }

  //SUBIR ARCHIVO
uploadFile(pdf){
  const file=pdf.target.files[0];
  const filename = pdf.target.files[0].name;
   this.filepath='Archivos/'+ this.ObjectUser.nombre+ '/'+filename;
  const ref=this.storage.ref(this.filepath);
  const tarea= this.storage.upload(this.filepath,file);
  this.porcentajesubida= tarea.percentageChanges();
  
  tarea.snapshotChanges().pipe(finalize(()=>this.urlFile=ref.getDownloadURL())).subscribe();

  this.progreso=true;

  //Cambia el porcentaje
  tarea.percentageChanges().subscribe((porcentaje) => {
    this.porcentaje = Math.round(porcentaje);
    if (this.porcentaje === 100) {
      this.progreso = false;
    }
  });
  
  }
  

//ACTUALIZAR PUBLI
updatePublicacion(publi: PublicacionInterface){
  console.log(this.formEditPubli.value);
  
  if(this.formEditPubli.valid){
    publi.fecha=new Date();
    if(this.inputFile.nativeElement.value===""){
     publi.file=this.ObjectPubli.file;  
     console.log('esta vacio');  
    }
    else{
      console.log('nueva url');   
      publi.file=this.inputFile.nativeElement.value;
    } 
     this.fireStore.updateDoc(publi,'Publicaciones',this.ObjectPubli.id)
     this.presentToast('Publicación Actualizada','success');
     this.salirModal();

  }else{
    this.presentToast('No deje campos Vacios','danger');
    
  }
 
}

//PRESENTAR ALERTA 
  async presentToast(text, color:string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      color: color
    });
    toast.present();
  }

  

}
